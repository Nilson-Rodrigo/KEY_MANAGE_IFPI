import dotenv from "dotenv";
import { readFile } from "node:fs/promises";
import { getFirestore } from "firebase-admin/firestore";
import { initializeFirebaseAdmin } from "./lib/firebase-admin.js";
import { codificarCodigoChave } from "./lib/firestore-key.js";

dotenv.config();
async function main(): Promise<void> {
  const path = process.env.KEYS_CSV?.trim();
  if (!path) throw new Error("Configure KEYS_CSV com o caminho do arquivo codigo,nome,descricao.");
  initializeFirebaseAdmin();
  const rows = (await readFile(path, "utf8")).split(/\r?\n/).slice(1).filter(Boolean);
  const db = getFirestore();
  for (const row of rows) {
    const [codigoRaw, nomeRaw = "", descricaoRaw = ""] = row.split(";");
    const codigo = codigoRaw?.trim().toUpperCase();
    if (!codigo) continue;
    await db.collection("chaves").doc(codificarCodigoChave(codigo)).set({ codigo, nome: nomeRaw.trim(), descricao: descricaoRaw.trim(), status: "disponivel", responsavelAtual: null, ultimaMovimentacaoEm: null, arquivada: false }, { merge: false });
  }
  console.log(`${rows.length} linha(s) processada(s).`);
}
main().catch((error: unknown) => { console.error("Falha ao importar chaves:", error); process.exitCode = 1; });
