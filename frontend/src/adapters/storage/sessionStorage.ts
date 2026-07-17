import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = '@coretech:sessao';

export type Sessao = {
  uid: string;
  nome: string;
  matricula: string;
  validadoEm: string;
};

const MAX_OFFLINE_SESSION_MS = 12 * 60 * 60 * 1000;

export const sessionStorage = {
  async salvar(uid: string, nome: string, matricula: string): Promise<void> {
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify({ uid, nome, matricula, validadoEm: new Date().toISOString() }));
  },

  async ler(): Promise<Sessao | null> {
    const data = await AsyncStorage.getItem(SESSION_KEY);
    if (!data) return null;
    try {
      const sessao = JSON.parse(data) as Partial<Sessao>;
      const validadoEm = typeof sessao.validadoEm === "string" ? Date.parse(sessao.validadoEm) : Number.NaN;
      if (typeof sessao.uid !== "string" || typeof sessao.nome !== "string"
        || typeof sessao.matricula !== "string" || typeof sessao.validadoEm !== "string"
        || !Number.isFinite(validadoEm) || Date.now() - validadoEm > MAX_OFFLINE_SESSION_MS) return null;
      return { uid: sessao.uid, nome: sessao.nome, matricula: sessao.matricula, validadoEm: sessao.validadoEm };
    } catch {
      return null;
    }
  },

  async limpar(): Promise<void> {
    await AsyncStorage.removeItem(SESSION_KEY);
  },
};
