import { Router } from 'express';
import { getUsersCache } from '../controllers/usersController';
import { getKeys } from '../controllers/keysController';

const router = Router();

router.get('/users/cache', getUsersCache);
router.get('/keys', getKeys);

export default router;