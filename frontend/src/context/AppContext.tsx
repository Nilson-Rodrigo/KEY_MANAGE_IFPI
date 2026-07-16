import React, { createContext, useContext, useState, ReactNode } from 'react';

type AppContextType = {
  nomeGuarda: string;
  matriculaGuarda: string;
  setNomeGuarda: (nome: string) => void;
  setMatriculaGuarda: (matricula: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [nomeGuarda, setNomeGuarda] = useState('');
  const [matriculaGuarda, setMatriculaGuarda] = useState('');

  return (
    <AppContext.Provider value={{ nomeGuarda, matriculaGuarda, setNomeGuarda, setMatriculaGuarda }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp precisa estar dentro de AppProvider');
  return ctx;
}