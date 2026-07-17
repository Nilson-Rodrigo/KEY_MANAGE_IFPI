import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { listarAuditoria, type EventoAuditoria } from "../../src/services/audit";
import { colors, shadows } from "../../src/presentation/theme";

export default function AuditoriaScreen(): React.ReactElement {
  const [eventos, setEventos] = useState<EventoAuditoria[]>([]);
  const carregar = useCallback(async (): Promise<void> => { setEventos(await listarAuditoria()); }, []);
  useFocusEffect(useCallback((): void => { void carregar(); }, [carregar]));
  return <View style={s.container}><Text style={s.title}>Auditoria administrativa</Text><Text style={s.subtitle}>Últimas 100 ações imutáveis</Text><FlatList data={eventos} keyExtractor={(item) => item.id} contentContainerStyle={s.list} renderItem={({ item }): React.ReactElement => <View style={s.card}><Text style={s.action}>{item.acao}</Text><Text style={s.detail}>{item.detalhes}</Text><Text style={s.meta}>{new Date(item.criadoEm).toLocaleString("pt-BR")} • {item.autorUid}</Text></View>} ListEmptyComponent={<Text style={s.empty}>Nenhuma ação registrada.</Text>} /></View>;
}

const s = StyleSheet.create({ container: { flex: 1, padding: 16, backgroundColor: colors.background }, title: { fontSize: 23, fontWeight: "800", color: colors.text }, subtitle: { color: colors.muted, marginBottom: 14 }, list: { gap: 10 }, card: { backgroundColor: colors.surface, padding: 14, borderRadius: 12, ...shadows.card }, action: { color: colors.brand, fontWeight: "800" }, detail: { color: colors.text, marginTop: 4 }, meta: { color: colors.muted, fontSize: 11, marginTop: 7 }, empty: { textAlign: "center", color: colors.muted, marginTop: 60 } });
