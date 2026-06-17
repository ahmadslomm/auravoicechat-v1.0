import { Router } from 'express';
import { EventController } from '../controllers/events.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.get('/active', authenticate, EventController.getActive);
router.get('/banners', authenticate, EventController.getBanners);

export default router;
