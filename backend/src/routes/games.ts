import { Router } from 'express';
import { GameController } from '../controllers/games.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.get('/jackpots', authenticate, GameController.getJackpots);
router.post('/start', authenticate, GameController.start);

export default router;
