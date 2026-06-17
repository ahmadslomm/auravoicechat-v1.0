import { Router } from 'express';
import { EarningController } from '../controllers/earning.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.get('/status', authenticate, EarningController.getStatus);
router.post('/cashout/request', authenticate, EarningController.cashout);

export default router;
