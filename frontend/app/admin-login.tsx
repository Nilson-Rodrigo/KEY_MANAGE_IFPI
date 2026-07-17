import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useApp } from "../src/context/AppContext";
import { AppButton } from "../src/presentation/components/AppButton";
import { colors, shadows } from "../src/presentation/theme";

export default function AdminLoginScreen(): React.ReactElement {
  const router = useRouter();
  const { entrarComoAdmin } = useApp();
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const login = async (): Promise<void> => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert("Aviso", "Preencha e-mail e senha.");
      return;
    }
    setBusy(true);
    try {
      await entrarComoAdmin(email.trim(), senha.trim());
      setSenha("");
      // O redirect para /(tabs)/painel é feito automaticamente pelo _layout.tsx
    } catch (e) {
      Alert.alert("Acesso negado", e instanceof Error ? e.message : "Credenciais inválidas.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={s.loginPage}>
      <View style={s.loginCard}>
        <View style={s.icon}>
          <Text style={s.iconText}>A</Text>
        </View>
        <Text style={s.kicker}>ÁREA RESTRITA</Text>
        <Text style={s.title}>Administração</Text>
        <Text style={s.subtitle}>Gerencie chaves e acessos com segurança.</Text>
        
        <TextInput 
          style={s.input} 
          placeholder="E-mail administrativo" 
          placeholderTextColor={colors.muted} 
          value={email} 
          onChangeText={setEmail} 
          autoCapitalize="none" 
          keyboardType="email-address" 
        />
        <TextInput 
          style={s.input} 
          placeholder="Senha" 
          placeholderTextColor={colors.muted} 
          value={senha} 
          onChangeText={setSenha} 
          secureTextEntry 
          onSubmitEditing={() => void login()} 
        />
        
        <AppButton label="Entrar como administrador" onPress={() => void login()} loading={busy} />
        
        <Pressable onPress={() => router.replace("/identificacao")}>
          <Text style={s.link}>Voltar ao acesso do guarda</Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  loginPage: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: colors.background },
  loginCard: { width: "100%", maxWidth: 460, alignSelf: "center", backgroundColor: colors.surface, borderRadius: 24, padding: 28, gap: 14, borderWidth: 1, borderColor: colors.border, ...shadows.card },
  icon: { width: 52, height: 52, borderRadius: 16, backgroundColor: colors.brand, alignItems: "center", justifyContent: "center" },
  iconText: { color: "#fff", fontSize: 22, fontWeight: "900" },
  kicker: { color: colors.accent, fontSize: 11, fontWeight: "800", letterSpacing: 1.3 },
  title: { color: colors.text, fontSize: 29, fontWeight: "800" },
  subtitle: { color: colors.muted, lineHeight: 20 },
  input: { minHeight: 48, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 14, color: colors.text, backgroundColor: "#FBFCFE" },
  link: { color: colors.brand, textAlign: "center", padding: 8, fontWeight: "700" },
});
