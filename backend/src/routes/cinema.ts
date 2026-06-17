import { Router } from 'express';
import { CinemaController } from '../controllers/cinema.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.post('/start', authenticate, CinemaController.start);

export default router;
