import { Router } from 'express';
import { FamilyController } from '../controllers/family.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.get('/mine', authenticate, FamilyController.getMine);
router.post('/create', authenticate, FamilyController.create);

export default router;
