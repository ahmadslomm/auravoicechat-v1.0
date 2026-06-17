import { Router } from 'express';
import { RankingController } from '../controllers/rankings.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.get('/senders', authenticate, RankingController.getSenders);
router.get('/families', authenticate, RankingController.getFamilies);

export default router;
