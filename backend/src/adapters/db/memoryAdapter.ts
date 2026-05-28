import { Chave, RegistroOperacao } from '../../core/entities';
import { ChaveRepository, RegistroRepository } from '../../core/ports';

const chaves: Chave[] = [];
const registros: RegistroOperacao[] = [];

export const memoryChaveRepo: ChaveRepository = {
  async findByCodigo(codigo: string) {
    return chaves.find(c => c.codigo === codigo) || null;
  },
  async listAll() {
    return chaves;
  },
  async save(chave: Chave) {
    const idx = chaves.findIndex(c => c.id === chave.id);
    if (idx >= 0) chaves[idx] = chave; else chaves.push(chave);
  }
};

export const memoryRegistroRepo: RegistroRepository = {
  async save(reg: RegistroOperacao) {
    registros.push(reg);
  },
  async listPending() {
    return registros.filter(r => !r.sincronizado);
  }
};
