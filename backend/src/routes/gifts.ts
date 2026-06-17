import { Router } from 'express';
import { GiftController } from '../controllers/gifts.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.get('/catalog', authenticate, GiftController.getCatalog);
router.post('/send', authenticate, GiftController.send);

export default router;
