import React, { useState, useEffect, useCallback } from 'react';
import { registerRootComponent } from 'expo';

import { AppProvider } from './src/context/AppContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { LoginScreen } from './src/features/auth/LoginScreen';
import { SplashScreen } from './src/presentation/components/SplashScreen';
import { sessionStorage } from './src/adapters/storage/sessionStorage';

export default function App() {
  const [autenticado, setAutenticado] = useState<boolean | null>(null);
  const [nomeGuarda, setNomeGuarda] = useState('');
  const [matriculaGuarda, setMatriculaGuarda] = useState('');

  useEffect(() => {
    const verificar = async () => {
      try {
        const sessao = await sessionStorage.ler();
        if (sessao) {
          setNomeGuarda(sessao.nome);
          setMatriculaGuarda(sessao.matricula);
          setAutenticado(true);
        } else {
          setAutenticado(false);
        }
      } catch {
        setAutenticado(false);
      }
    };
    verificar();
  }, []);

  const handleLoginSucesso = useCallback(async (nome: string, matricula: string) => {
    await sessionStorage.salvar(nome, matricula);
    setNomeGuarda(nome);
    setMatriculaGuarda(matricula);
    setAutenticado(true);
  }, []);

  const handleLogout = useCallback(async () => {
    await sessionStorage.limpar();
    setNomeGuarda('');
    setMatriculaGuarda('');
    setAutenticado(false);
  }, []);

  if (autenticado === null) {
    return <SplashScreen />;
  }

  if (autenticado === false) {
    return <LoginScreen onLoginSucesso={handleLoginSucesso} />;
  }

  return (
    <AppProvider nomeGuarda={nomeGuarda} matriculaGuarda={matriculaGuarda}>
      <AppNavigator onLogout={handleLogout} />
    </AppProvider>
  );
}

registerRootComponent(App);