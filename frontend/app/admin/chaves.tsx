import { useState, useCallback, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Modal, TextInput, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { api, type Chave } from "../../src/services/api";
import { colors, shadows } from "../../src/presentation/theme";

export default function GerenciarChavesScreen(): React.ReactNode {
  const [chaves, setChaves] = useState<Chave[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [codigoInput, setCodigoInput] = useState("");
  const [nomeInput, setNomeInput] = useState("");
  const [descricaoInput, setDescricaoInput] = useState("");
  const [chaveEditando, setChaveEditando] = useState<Chave | null>(null);

  const carregarChaves = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.listarChaves();
      setChaves(data);
    } catch (error) {
      Alert.alert("Erro", "Falha ao carregar chaves.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void carregarChaves();
  }, [carregarChaves]);

  const handleSalvar = async () => {
    if (!codigoInput.trim()) return;
    try {
      if (chaveEditando) {
        await api.editarChave(chaveEditando.codigo, codigoInput.trim(), nomeInput.trim(), descricaoInput.trim());
        Alert.alert("Sucesso", "Chave atualizada com sucesso!");
      } else {
        await api.cadastrarChave(codigoInput.trim(), nomeInput.trim(), descricaoInput.trim());
        Alert.alert("Sucesso", "Chave cadastrada com sucesso!");
      }
      setModalVisible(false);
      void carregarChaves();
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Falha ao salvar a chave.");
    }
  };

  const handleApagar = (codigo: string) => {
    Alert.alert("Apagar chave", `Tem certeza que deseja apagar a chave ${codigo}?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Apagar", style: "destructive", onPress: async () => {
        try {
          await api.apagarChave(codigo);
          Alert.alert("Sucesso", "Chave apagada com sucesso!");
          void carregarChaves();
        } catch (error: any) {
          Alert.alert("Erro", error.message || "Falha ao apagar a chave.");
        }
      }}
    ]);
  };

  const renderItem = ({ item }: { item: Chave }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.codigo}>{item.codigo}</Text>
        {!!item.nome && <Text style={styles.nomeChave}>{item.nome}</Text>}
        {!!item.descricao && <Text style={styles.descricaoChave}>{item.descricao}</Text>}
        <Text style={styles.status}>{item.status === 'disponivel' ? 'Disponível' : 'Em uso'}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => { 
          setChaveEditando(item); 
          setCodigoInput(item.codigo); 
          setNomeInput(item.nome || "");
          setDescricaoInput(item.descricao || "");
          setModalVisible(true); 
        }}>
          <MaterialCommunityIcons name="pencil" size={20} color={colors.brand} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={() => handleApagar(item.codigo)}>
          <MaterialCommunityIcons name="delete" size={20} color={colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gerenciar Chaves</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => { 
          setChaveEditando(null); 
          setCodigoInput(""); 
          setNomeInput("");
          setDescricaoInput("");
          setModalVisible(true); 
        }}>
          <MaterialCommunityIcons name="plus" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Nova Chave</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={chaves}
          keyExtractor={(item) => item.codigo}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>Nenhuma chave cadastrada.</Text>}
        />
      )}

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{chaveEditando ? "Editar Chave" : "Nova Chave"}</Text>
            <TextInput
              style={styles.input}
              placeholder="Código (Ex: A/S1) - Obrigatório"
              value={codigoInput}
              onChangeText={setCodigoInput}
              autoCapitalize="characters"
            />
            <TextInput
              style={styles.input}
              placeholder="Nome (Ex: Lab Info) - Opcional"
              value={nomeInput}
              onChangeText={setNomeInput}
            />
            <TextInput
              style={[styles.input, { marginBottom: 24 }]}
              placeholder="Descrição (Opcional)"
              value={descricaoInput}
              onChangeText={setDescricaoInput}
            />
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
  cardInfo: { flex: 1 },
  codigo: { fontSize: 18, fontWeight: 'bold', color: colors.text },
  status: { fontSize: 14, color: colors.muted },
  actions: { flexDirection: 'row', gap: 12 },
  iconBtn: { padding: 8, backgroundColor: colors.background, borderRadius: 8 },
  empty: { textAlign: 'center', marginTop: 24, color: colors.muted },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 16 },
  modalContent: { backgroundColor: colors.surface, padding: 24, borderRadius: 16, ...shadows.card },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: colors.border, padding: 12, borderRadius: 8, fontSize: 16, marginBottom: 12 },
  nomeChave: { fontSize: 14, fontWeight: '600', color: colors.text, marginTop: 4 },
  descricaoChave: { fontSize: 12, color: colors.muted, marginTop: 2, marginBottom: 4 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
  modalBtnCancel: { padding: 12 },
  modalBtnTextCancel: { color: colors.muted, fontWeight: 'bold' },
  modalBtnSave: { backgroundColor: colors.brand, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  modalBtnTextSave: { color: '#fff', fontWeight: 'bold' }
});
