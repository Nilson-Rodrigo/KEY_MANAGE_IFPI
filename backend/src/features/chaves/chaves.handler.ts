import { GerenciaChaves } from '../../core/usecases';

export function createChavesHandler(gerencia: GerenciaChaves) {
  return {
    async retirar(req: any, res: any) {
      try {
        const { codigo, operador } = req.body;
        const reg = await gerencia.retirar(codigo, operador);
        res.status(201).json(reg);
      } catch (err: any) {
        res.status(400).json({ error: err.message });
      }
    },
  };
}
