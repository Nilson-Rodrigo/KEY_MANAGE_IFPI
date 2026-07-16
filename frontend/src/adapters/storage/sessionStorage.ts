import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = '@coretech:sessao';

export type Sessao = {
  nome: string;
  matricula: string;
};

export const sessionStorage = {
  async salvar(nome: string, matricula: string): Promise<void> {
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify({ nome, matricula }));
  },

  async ler(): Promise<Sessao | null> {
    const data = await AsyncStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  },

  async limpar(): Promise<void> {
    await AsyncStorage.removeItem(SESSION_KEY);
  },
};