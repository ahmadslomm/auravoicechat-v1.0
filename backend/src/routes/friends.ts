import { Router } from 'express';
import { FriendController } from '../controllers/friends.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.get('/', authenticate, FriendController.get);
router.post('/request/:userId', authenticate, FriendController.request);
router.put('/request/:id/accept', authenticate, FriendController.accept);

export default router;
