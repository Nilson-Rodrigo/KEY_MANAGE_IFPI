import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from "@firebase/rules-unit-testing";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID ?? "coretech-rules-test";
const emulator = process.env.FIRESTORE_EMULATOR_HOST ?? "127.0.0.1:8080";
const [host, rawPort] = emulator.split(":");
const port = Number(rawPort);

if (!host || !Number.isInteger(port)) {
  throw new Error(`FIRESTORE_EMULATOR_HOST inválido: ${emulator}`);
}

const testEnv = await initializeTestEnvironment({
  projectId,
  firestore: {
    host,
    port,
    rules: readFileSync(resolve("firestore.rules"), "utf8"),
  },
});

try {
  await testEnv.clearFirestore();
  await testEnv.withSecurityRulesDisabled(async (context): Promise<void> => {
    const db = context.firestore();
    await setDoc(doc(db, "usuarios", "admin-1"), {
      uid: "admin-1", nome: "Administrador", matricula: "admin", perfil: "admin", ativo: true,
      criadoEm: new Date(), atualizadoEm: new Date(),
    });
    await setDoc(doc(db, "usuarios", "guarda-1"), {
      uid: "guarda-1", nome: "Guarda Ativo", matricula: "g1", perfil: "guarda", ativo: true,
      criadoEm: new Date(), atualizadoEm: new Date(),
    });
    await setDoc(doc(db, "usuarios", "guarda-2"), {
      uid: "guarda-2", nome: "Guarda Bloqueado", matricula: "g2", perfil: "guarda", ativo: false,
      criadoEm: new Date(), atualizadoEm: new Date(),
    });
    await setDoc(doc(db, "chaves", "A%2FS1"), {
      codigo: "A/S1", nome: "Sala 1", descricao: "", status: "disponivel",
      responsavelAtual: null, ultimaMovimentacaoEm: null,
    });
  });

  const anonimo = testEnv.unauthenticatedContext().firestore();
  const guarda = testEnv.authenticatedContext("guarda-1").firestore();
  const bloqueado = testEnv.authenticatedContext("guarda-2").firestore();
  const admin = testEnv.authenticatedContext("admin-1").firestore();

  await assertFails(getDoc(doc(anonimo, "chaves", "A%2FS1")));
  await assertSucceeds(getDoc(doc(guarda, "chaves", "A%2FS1")));
  await assertFails(getDoc(doc(bloqueado, "chaves", "A%2FS1")));
  await assertFails(getDocs(collection(guarda, "usuarios")));
  await assertSucceeds(getDocs(collection(admin, "usuarios")));
  await assertFails(setDoc(doc(guarda, "usuarios", "invasor"), {
    uid: "invasor", nome: "Invasor", matricula: "x", perfil: "admin", ativo: true,
    criadoEm: new Date(), atualizadoEm: new Date(),
  }));
  await assertSucceeds(setDoc(doc(admin, "usuarios", "guarda-3"), {
    uid: "guarda-3", nome: "Novo Guarda", matricula: "g3", perfil: "guarda", ativo: true,
    criadoEm: new Date(), atualizadoEm: new Date(),
  }));
  await assertFails(setDoc(doc(admin, "usuarios", "admin-2"), {
    uid: "admin-2", nome: "Outro Admin", matricula: "admin2", perfil: "admin", ativo: true,
    criadoEm: new Date(), atualizadoEm: new Date(),
  }));
  await assertFails(setDoc(doc(guarda, "colecao-desconhecida", "x"), { ativo: true }));
  await assertSucceeds(setDoc(doc(admin, "chaves", "B1"), { codigo: "B1", nome: "Sala B1", descricao: "", status: "disponivel", responsavelAtual: null, ultimaMovimentacaoEm: null, arquivada: false }));
  await assertSucceeds(updateDoc(doc(admin, "chaves", "B1"), { arquivada: true }));
  await assertFails(deleteDoc(doc(admin, "chaves", "B1")));
  await assertSucceeds(addDoc(collection(admin, "auditoria"), { acao: "chave.arquivada", alvo: "B1", detalhes: "teste", autorUid: "admin-1", criadoEm: serverTimestamp() }));
  await assertFails(addDoc(collection(guarda, "auditoria"), { acao: "invasao", alvo: "B1", detalhes: "teste", autorUid: "guarda-1", criadoEm: serverTimestamp() }));

  console.log("firestore-rules-security-tests-passed");
} finally {
  await testEnv.cleanup();
}
