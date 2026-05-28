// Entidades do domínio (exemplos simples)
export type Chave = {
  id: string; // uuid ou código como A/S9
  codigo: string;
  descricao?: string;
  disponivel: boolean;
};

export type RegistroOperacao = {
  id: string;
  chaveId: string;
  operacao: 'retirada' | 'devolucao';
  operador: string; // nome/matricula
  timestamp: string; // ISO
  sincronizado?: boolean;
};
