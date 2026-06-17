import { Router } from 'express';
import { VipController } from '../controllers/vip.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.get('/status', authenticate, VipController.getStatus);
router.post('/purchase', authenticate, VipController.purchase);

export default router;
