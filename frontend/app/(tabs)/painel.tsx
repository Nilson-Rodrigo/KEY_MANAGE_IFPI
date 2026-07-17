import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, shadows } from "../../src/presentation/theme";
import { useApp } from "../../src/context/AppContext";

export default function AdminScreen(): React.ReactNode {
  const router = useRouter();
  const { perfil } = useApp();

  if (perfil !== "admin") {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Acesso negado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>ADMINISTRAÇÃO</Text>
        <Text style={styles.heroTitle}>Painel de Controle</Text>
        <Text style={styles.heroSubtitle}>Gerencie os guardas e as chaves do sistema.</Text>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => router.push("/admin/guardas")}
          accessibilityRole="button"
        >
          <View style={[styles.iconContainer, { backgroundColor: colors.brandSoft }]}>
            <MaterialCommunityIcons name="shield-account" size={32} color={colors.brand} />
          </View>
          <Text style={styles.cardTitle}>Gerenciar Guardas</Text>
          <Text style={styles.cardDesc}>Adicionar, editar ou inativar perfis de acesso</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card} 
          onPress={() => router.push("/admin/chaves")}
          accessibilityRole="button"
        >
          <View style={[styles.iconContainer, { backgroundColor: "#fef3c7" }]}>
            <MaterialCommunityIcons name="key-variant" size={32} color="#d97706" />
          </View>
          <Text style={styles.cardTitle}>Gerenciar Chaves</Text>
          <Text style={styles.cardDesc}>Cadastrar, editar ou remover chaves do quadro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: colors.danger,
    fontWeight: "bold",
  },
  hero: { paddingVertical: 12, gap: 4, marginBottom: 24, paddingHorizontal: 8 },
  heroEyebrow: { color: colors.accent, fontSize: 11, fontWeight: "800", letterSpacing: 1.3 },
  heroTitle: { color: colors.text, fontSize: 27, fontWeight: "800" },
  heroSubtitle: { color: colors.muted, fontSize: 14 },
  grid: {
    gap: 16,
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
  },
  iconContainer: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  cardDesc: {
    fontSize: 14,
    color: colors.muted,
  },
});
