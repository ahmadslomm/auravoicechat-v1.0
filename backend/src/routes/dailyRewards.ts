import { Router } from 'express';
import { DailyRewardController } from '../controllers/dailyRewards.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.get('/status', authenticate, DailyRewardController.getStatus);
router.post('/claim', authenticate, DailyRewardController.claim);

export default router;
