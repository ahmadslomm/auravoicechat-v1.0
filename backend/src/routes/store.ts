import { Router } from 'express';
import { StoreController } from '../controllers/store.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.get('/catalog', authenticate, StoreController.getCatalog);
router.post('/purchase/:id', authenticate, StoreController.purchase);

export default router;
