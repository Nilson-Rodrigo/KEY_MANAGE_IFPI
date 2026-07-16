import { describe, expect, it } from "vitest";
import { normalizarMatricula, pinValido } from "../src/services/auth";

describe("credenciais do guarda", () => {
  it("normaliza matrícula para o identificador interno", () => {
    expect(normalizarMatricula("  GUArda.01-A  ")).toBe("guarda.01-a");
    expect(normalizarMatricula("12 34/56")).toBe("123456");
  });

  it("aceita exclusivamente PIN numérico de seis dígitos", () => {
    expect(pinValido("012345")).toBe(true);
    expect(pinValido("12345")).toBe(false);
    expect(pinValido("1234567")).toBe(false);
    expect(pinValido("12345a")).toBe(false);
  });
});
