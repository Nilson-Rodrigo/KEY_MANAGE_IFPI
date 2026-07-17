import { useState, useCallback, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Modal, TextInput, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { listarGuardas, cadastrarGuarda, editarGuarda, apagarGuarda, type Usuario } from "../../src/services/auth";
import { colors, shadows } from "../../src/presentation/theme";

export default function GerenciarGuardasScreen(): React.ReactNode {
  const [guardas, setGuardas] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [pin, setPin] = useState("");
  const [guardaEditando, setGuardaEditando] = useState<Usuario | null>(null);

  const carregarGuardas = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listarGuardas();
      setGuardas(data);
    } catch (error) {
      Alert.alert("Erro", "Falha ao carregar guardas.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void carregarGuardas();
  }, [carregarGuardas]);

  const handleSalvar = async () => {
    if (!nome.trim() || !matricula.trim()) {
      Alert.alert("Aviso", "Preencha nome e matrícula.");
      return;
    }
    
    try {
      if (guardaEditando) {
        await editarGuarda(guardaEditando, nome, matricula);
        Alert.alert("Sucesso", "Guarda atualizado com sucesso!");
      } else {
        if (!pin.trim() || pin.length !== 6) {
          Alert.alert("Aviso", "Para novos guardas, informe um PIN de 6 dígitos.");
          return;
        }
        await cadastrarGuarda(nome, matricula, pin);
        Alert.alert("Sucesso", "Guarda cadastrado com sucesso!");
      }
      setModalVisible(false);
      void carregarGuardas();
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Falha ao salvar o guarda.");
    }
  };

  const handleApagar = (guarda: Usuario) => {
    Alert.alert("Inativar guarda", `Tem certeza que deseja inativar ${guarda.nome}? Ele não poderá mais acessar o sistema.`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Inativar", style: "destructive", onPress: async () => {
        try {
          await apagarGuarda(guarda);
          Alert.alert("Sucesso", "Guarda inativado com sucesso!");
          void carregarGuardas();
        } catch (error: any) {
          Alert.alert("Erro", error.message || "Falha ao inativar guarda.");
        }
      }}
    ]);
  };

  const renderItem = ({ item }: { item: Usuario }) => (
    <View style={[styles.card, !item.ativo && styles.cardInativo]}>
      <View style={styles.cardInfo}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.matricula}>Matrícula: {item.matricula}</Text>
        {!item.ativo && <Text style={styles.statusInativo}>Inativo</Text>}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => { 
          setGuardaEditando(item); 
          setNome(item.nome); 
          setMatricula(item.matricula); 
          setPin(""); 
          setModalVisible(true); 
        }}>
          <MaterialCommunityIcons name="pencil" size={20} color={colors.brand} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={() => handleApagar(item)}>
          <MaterialCommunityIcons name="delete" size={20} color={colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gerenciar Guardas</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => { 
          setGuardaEditando(null); 
          setNome(""); 
          setMatricula(""); 
          setPin(""); 
          setModalVisible(true); 
        }}>
          <MaterialCommunityIcons name="plus" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Novo Guarda</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={guardas}
          keyExtractor={(item) => item.uid}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>Nenhum guarda cadastrado.</Text>}
        />
      )}

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{guardaEditando ? "Editar Guarda" : "Novo Guarda"}</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={styles.input}
              placeholder="Matrícula"
              value={matricula}
              onChangeText={setMatricula}
              autoCapitalize="none"
            />
            {!guardaEditando && (
              <TextInput
                style={styles.input}
                placeholder="PIN (6 dígitos)"
                value={pin}
                onChangeText={setPin}
                keyboardType="numeric"
                maxLength={6}
                secureTextEntry
              />
            )}

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalBtnTextCancel}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtnSave} onPress={handleSalvar}>
                <Text style={styles.modalBtnTextSave}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', color: colors.text },
  addButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.brand, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  addButtonText: { color: '#fff', fontWeight: 'bold', marginLeft: 4 },
  list: { padding: 16, gap: 12 },
  card: { backgroundColor: colors.surface, padding: 16, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', ...shadows.card },
  cardInativo: { opacity: 0.5 },
  cardInfo: { flex: 1 },
  nome: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  matricula: { fontSize: 14, color: colors.muted },
  statusInativo: { fontSize: 12, color: colors.danger, fontWeight: 'bold', marginTop: 4 },
  actions: { flexDirection: 'row', gap: 12 },
  iconBtn: { padding: 8, backgroundColor: colors.background, borderRadius: 8 },
  empty: { textAlign: 'center', marginTop: 24, color: colors.muted },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 16 },
  modalContent: { backgroundColor: colors.surface, padding: 24, borderRadius: 16, ...shadows.card },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: colors.border, padding: 12, borderRadius: 8, fontSize: 16, marginBottom: 16 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12, marginTop: 8 },
  modalBtnCancel: { padding: 12 },
  modalBtnTextCancel: { color: colors.muted, fontWeight: 'bold' },
  modalBtnSave: { backgroundColor: colors.brand, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  modalBtnTextSave: { color: '#fff', fontWeight: 'bold' }
});
