// Módulo de rotas da API
// Aqui mapeamos endpoints para os controllers correspondentes.
import { Router } from 'express';
import { getUsersCache } from '../controllers/usersController';
import { getKeys } from '../controllers/keysController';
import { syncEvents, getSyncStatus } from '../controllers/syncController';

const router = Router();

// Rota que exporta a lista de usuários para cache offline no app
router.get('/users/cache', getUsersCache);

// Rota que retorna o estado atual de todas as chaves
router.get('/keys', getKeys);

// Endpoint de sincronização: dispositivos enviam batches de eventos
router.post('/sync', syncEvents);

// Endpoint para consultar o histórico/status de sync de um device
router.get('/sync/status/:deviceId', getSyncStatus);

export default router;