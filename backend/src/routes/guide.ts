import { Router } from 'express';
import { GuideController } from '../controllers/guide.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.post('/apply', authenticate, GuideController.apply);
router.get('/application/my', authenticate, GuideController.getMyApplication);

export default router;
