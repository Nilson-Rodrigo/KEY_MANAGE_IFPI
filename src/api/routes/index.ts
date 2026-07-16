import { Router, Request, Response } from "express";
import { IdentificacaoController } from "../controllers/identificacao.controller.js";
import { ChavesController } from "../controllers/chaves.controller.js";
import { SyncController } from "../controllers/sync.controller.js";
import type { ChavesService } from "../../features/chaves/chaves.service.js";
import type { SyncService } from "../../features/sync/sync.service.js";

export function criarRotas(
  chavesService: ChavesService,
  syncService: SyncService
): Router {
  const router = Router();
  const identificacaoController = new IdentificacaoController();
  const chavesController = new ChavesController(chavesService);
  const syncController = new SyncController(syncService);

  router.get("/", (_req: Request, res: Response) => {
    res.status(200).json({
      nome: "CoreTech — Sistema de Gerenciamento de Acesso a Chaves",
      versao: "1.0.0",
      status: "operacional",
      documentacao: "https://github.com/Nilson-Rodrigo/KEY_MANAGE_IFPI/blob/feature/frontend-expo-setup/src/specs/openapi.yaml",
      endpoints: [
        "POST /v1/identificacao",
        "GET /v1/chaves",
        "GET /v1/chaves/:codigo",
        "GET /v1/chaves/:codigo/historico",
        "POST /v1/chaves/:codigo/retirada",
        "POST /v1/chaves/:codigo/devolucao",
        "POST /v1/sync",
      ],
    });
  });

  router.post("/identificacao", identificacaoController.registrarIdentificacao);

  router.get("/chaves", chavesController.listarChaves);
  router.get("/chaves/:codigo", chavesController.buscarChave);
  router.get("/chaves/:codigo/historico", chavesController.buscarHistorico);
  router.post("/chaves/:codigo/retirada", chavesController.retirarChave);
  router.post("/chaves/:codigo/devolucao", chavesController.devolverChave);

  router.post("/sync", syncController.sincronizar);

  return router;
}
