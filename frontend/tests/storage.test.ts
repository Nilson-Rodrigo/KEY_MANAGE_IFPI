import { beforeEach, describe, expect, it, vi } from "vitest";

const dados = new Map<string, string>();

vi.mock("@react-native-async-storage/async-storage", (): object => ({
  default: {
    getItem: async (chave: string): Promise<string | null> => dados.get(chave) ?? null,
    setItem: async (chave: string, valor: string): Promise<void> => {
      dados.set(chave, valor);
    },
    removeItem: async (chave: string): Promise<void> => {
      dados.delete(chave);
    },
    multiRemove: async (chaves: string[]): Promise<void> => {
      chaves.forEach((chave): void => {
        dados.delete(chave);
      });
    },
  },
}));

vi.mock("expo-network", (): object => ({
  getNetworkStateAsync: async (): Promise<object> => ({
    isConnected: true,
    isInternetReachable: true,
  }),
}));

import { storage } from "../src/services/storage";
import { sessionStorage } from "../src/adapters/storage/sessionStorage";

describe("storage offline", (): void => {
  beforeEach((): void => {
    vi.useRealTimers();
    dados.clear();
  });

  it("restaura somente sessão recente e do mesmo usuário", async (): Promise<void> => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-17T08:00:00.000Z"));
    await sessionStorage.salvar("uid-1", "Guarda Teste", "123");
    expect(await sessionStorage.ler()).toMatchObject({ uid: "uid-1", nome: "Guarda Teste", matricula: "123" });

    vi.setSystemTime(new Date("2026-07-17T21:00:01.000Z"));
    expect(await sessionStorage.ler()).toBeNull();
  });

  it("mantém um deviceId estável", async (): Promise<void> => {
    const primeiro = await storage.getDeviceId();
    const segundo = await storage.getDeviceId();
    expect(segundo).toBe(primeiro);
  });

  it("gera UUID e remove somente movimentações confirmadas", async (): Promise<void> => {
    const payload = {
      responsavel: { nome: "Guarda Teste", matricula: "123" },
      timestampLocal: new Date().toISOString(),
      deviceId: await storage.getDeviceId(),
    };
    const primeira = await storage.adicionarMovimentacaoPendente({ chaveCodigo: "A/S1", tipo: "retirada", payload });
    const segunda = await storage.adicionarMovimentacaoPendente({ chaveCodigo: "A/S2", tipo: "retirada", payload });

    expect(primeira.id).toMatch(/^[0-9a-f-]{36}$/i);
    await storage.removerMovimentacoesPendentes([primeira.id]);
    const restantes = await storage.buscarMovimentacoesPendentes();
    expect(restantes.map((item) => item.id)).toEqual([segunda.id]);
  });

  it("preserva conflito até retry ou descarte explícito", async (): Promise<void> => {
    const item = await storage.adicionarMovimentacaoPendente({ chaveCodigo: "A/S3", tipo: "retirada", payload: { responsavel: { nome: "Guarda", matricula: "123" }, timestampLocal: new Date().toISOString(), deviceId: "device-1" } });
    await storage.marcarMovimentacaoComErro(item.id, "Chave já retirada em outro dispositivo.");
    expect((await storage.buscarMovimentacoesPendentes())[0]?.error).toContain("outro dispositivo");
    await storage.liberarMovimentacaoParaRetry(item.id);
    expect((await storage.buscarMovimentacoesPendentes())[0]?.error).toBeUndefined();
    await storage.agendarNovaTentativa(item.id);
    expect((await storage.buscarMovimentacoesPendentes())[0]?.tentativas).toBe(1);
    await storage.removerMovimentacoesPendentes([item.id]);
    expect(await storage.buscarMovimentacoesPendentes()).toEqual([]);
  });
});
