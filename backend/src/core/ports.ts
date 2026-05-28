// Ports (interfaces) que descrevem contratos entre o core e infra

import { Chave, RegistroOperacao } from './entities';

export interface ChaveRepository {
  findByCodigo(codigo: string): Promise<Chave | null>;
  listAll(): Promise<Chave[]>;
  save(chave: Chave): Promise<void>;
}

export interface RegistroRepository {
  save(reg: RegistroOperacao): Promise<void>;
  listPending(): Promise<RegistroOperacao[]>;
}
