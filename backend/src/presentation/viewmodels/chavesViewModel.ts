import { GerenciaChaves } from '../../core/usecases';

export class ChavesViewModel {
  constructor(private gerencia: GerenciaChaves) {}

  async handleRetirar(codigo: string, operador: string) {
    // lógica de orquestração para a UI
    const reg = await this.gerencia.retirar(codigo, operador);
    // atualizar estado local, notificar view, etc.
    return reg;
  }
}
