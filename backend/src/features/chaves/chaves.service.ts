import { ChaveRepository, RegistroRepository } from '../../core/ports';
import { GerenciaChaves } from '../../core/usecases';

export function createChavesService(chaveRepo: ChaveRepository, regRepo: RegistroRepository) {
  const gerencia = new GerenciaChaves(chaveRepo, regRepo);
  return { gerencia };
}
