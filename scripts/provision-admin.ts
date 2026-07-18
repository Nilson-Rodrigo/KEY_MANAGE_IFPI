import dotenv from "dotenv";
import { getAuth } from "firebase-admin/auth";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { initializeFirebaseAdmin } from "./lib/firebase-admin.js";

dotenv.config();

function obrigatoria(nome: "ADMIN_EMAIL" | "ADMIN_PASSWORD" | "ADMIN_NAME" | "ADMIN_MATRICULA"): string {
  const valor = process.env[nome]?.trim();
  if (!valor) throw new Error(`${nome} nao foi configurado.`);
  return valor;
}

async function main(): Promise<void> {
  initializeFirebaseAdmin();
  const email = obrigatoria("ADMIN_EMAIL").toLowerCase();
  const password = obrigatoria("ADMIN_PASSWORD");
  const nome = obrigatoria("ADMIN_NAME");
  const matricula = obrigatoria("ADMIN_MATRICULA").toLowerCase();
  if (password.length < 8) throw new Error("ADMIN_PASSWORD deve ter pelo menos 8 caracteres.");

  const auth = getAuth();
  const existente = await auth.getUserByEmail(email).catch((error: unknown) => {
    if (typeof error === "object" && error !== null && "code" in error
      && error.code === "auth/user-not-found") return null;
    throw error;
  });
  const usuario = existente
    ? await auth.updateUser(existente.uid, { displayName: nome, password, disabled: false })
    : await auth.createUser({ email, password, displayName: nome, emailVerified: true });

  await getFirestore().collection("usuarios").doc(usuario.uid).set({
    uid: usuario.uid,
    nome,
    matricula,
    perfil: "admin",
    ativo: true,
    criadoEm: FieldValue.serverTimestamp(),
    atualizadoEm: FieldValue.serverTimestamp(),
  }, { merge: true });

  console.log(`Administrador provisionado: ${email}`);
}

main().catch((error: unknown) => {
  console.error("Falha ao provisionar administrador:", error);
  process.exitCode = 1;
});
