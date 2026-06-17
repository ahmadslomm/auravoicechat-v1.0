import { Router } from 'express';
import { KycController } from '../controllers/kyc.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.get('/status', authenticate, KycController.getStatus);
router.post('/submit', authenticate, KycController.submit);

export default router;
