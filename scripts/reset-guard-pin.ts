import dotenv from "dotenv";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { initializeFirebaseAdmin } from "./lib/firebase-admin.js";

dotenv.config();

async function main(): Promise<void> {
  const matricula = process.env.GUARD_MATRICULA?.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "");
  const pin = process.env.GUARD_NEW_PIN?.trim();
  if (!matricula || !/^\d{6}$/.test(pin ?? "")) throw new Error("Configure GUARD_MATRICULA e GUARD_NEW_PIN com seis dígitos.");
  initializeFirebaseAdmin();
  const acesso = await getFirestore().collection("acessos").doc(matricula).get();
  const uid = acesso.data()?.uid;
  if (typeof uid !== "string") throw new Error("Guarda não encontrado.");
  await getAuth().updateUser(uid, { password: pin, disabled: false });
  console.log(`PIN redefinido para a matrícula ${matricula}.`);
}

main().catch((error: unknown) => { console.error("Falha ao redefinir PIN:", error); process.exitCode = 1; });
