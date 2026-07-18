import dotenv from "dotenv";
import { writeFile } from "node:fs/promises";
import { getFirestore, type Timestamp } from "firebase-admin/firestore";
import { initializeFirebaseAdmin } from "./lib/firebase-admin.js";

dotenv.config();
function csv(value: unknown): string { return `"${String(value ?? "").replace(/"/g, '""')}"`; }
async function main(): Promise<void> {
  initializeFirebaseAdmin();
  const output = process.env.HISTORY_CSV?.trim() ?? "historico-chaves.csv";
  const snapshot = await getFirestore().collection("movimentacoes").orderBy("timestampLocal", "desc").get();
  const lines = ["id;chave;tipo;responsavel;matricula;data;dispositivo"];
  snapshot.forEach((item) => { const d = item.data(); lines.push([item.id, d.chaveCodigo, d.tipo, d.responsavel?.nome, d.responsavel?.matricula, (d.timestampLocal as Timestamp | undefined)?.toDate().toISOString(), d.deviceId].map(csv).join(";")); });
  await writeFile(output, `\uFEFF${lines.join("\n")}`, "utf8");
  console.log(`${snapshot.size} movimentação(ões) exportada(s) para ${output}.`);
}
main().catch((error: unknown) => { console.error("Falha ao exportar histórico:", error); process.exitCode = 1; });
