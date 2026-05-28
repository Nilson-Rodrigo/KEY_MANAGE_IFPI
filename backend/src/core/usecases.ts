import { Chave, RegistroOperacao } from './entities';
import { ChaveRepository, RegistroRepository } from './ports';

export class GerenciaChaves {
  constructor(private chaveRepo: ChaveRepository, private regRepo: RegistroRepository) {}

  async retirar(codigo: string, operador: string): Promise<RegistroOperacao> {
    const chave = await this.chaveRepo.findByCodigo(codigo);
    if (!chave || !chave.disponivel) throw new Error('Chave não disponível');
    chave.disponivel = false;
    await this.chaveRepo.save(chave);
    const reg: RegistroOperacao = {
      id: Math.random().toString(36).slice(2),
      chaveId: chave.id,
      operacao: 'retirada',
      operador,
      timestamp: new Date().toISOString(),
      sincronizado: false,
    };
    await this.regRepo.save(reg);
    return reg;
  }
}
