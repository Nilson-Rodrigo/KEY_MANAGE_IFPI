import { addDoc, collection, getDocs, limit, orderBy, query, serverTimestamp, type Timestamp } from "firebase/firestore";
import { firebaseServices } from "./firebase";

export type EventoAuditoria = { id: string; acao: string; alvo: string; detalhes: string; autorUid: string; criadoEm: string };

export async function registrarAuditoria(acao: string, alvo: string, detalhes: string): Promise<void> {
  const { auth, db } = firebaseServices();
  if (!auth.currentUser) return;
  await addDoc(collection(db, "auditoria"), { acao, alvo, detalhes, autorUid: auth.currentUser.uid, criadoEm: serverTimestamp() });
}

export async function listarAuditoria(): Promise<EventoAuditoria[]> {
  const snapshot = await getDocs(query(collection(firebaseServices().db, "auditoria"), orderBy("criadoEm", "desc"), limit(100)));
  return snapshot.docs.map((item) => {
    const data = item.data();
    return { id: item.id, acao: String(data.acao), alvo: String(data.alvo), detalhes: String(data.detalhes), autorUid: String(data.autorUid), criadoEm: (data.criadoEm as Timestamp | undefined)?.toDate().toISOString() ?? new Date().toISOString() };
  });
}
