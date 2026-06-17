import { Router } from 'express';
import { MedalController } from '../controllers/medals.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.get('/all', authenticate, MedalController.getAll);
router.get('/mine', authenticate, MedalController.getMine);

export default router;
