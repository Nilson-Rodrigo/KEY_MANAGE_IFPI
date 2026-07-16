import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { IdentificacaoRequestSchema } from '../../../specs/schemas/identificacao.schema';
import { api } from '../../../src/services/api';

type Props = {
  onLoginSucesso: (nome: string, matricula: string) => void;
};

export default function LoginScreen({ onLoginSucesso }: Props): React.ReactElement {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async (): Promise<void> => {
    const parsed = IdentificacaoRequestSchema.safeParse({ nome, matricula });
    if (!parsed.success) {
      Alert.alert('Validação', 'Preencha nome e matrícula.');
      return;
    }

    setCarregando(true);
    try {
      await api.identificar(parsed.data);
      onLoginSucesso(nome, matricula);
    } catch {
      Alert.alert('Erro', 'Não foi possível realizar a identificação. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Identificação do Guarda</Text>
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
      />
      <Button title={carregando ? 'Entrando...' : 'Entrar'} onPress={handleLogin} disabled={carregando} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});