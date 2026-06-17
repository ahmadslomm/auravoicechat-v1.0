import { Router } from 'express';
import { ReferralController } from '../controllers/referral.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.get('/summary', authenticate, ReferralController.getSummary);
router.post('/bind', authenticate, ReferralController.bind);

export default router;
