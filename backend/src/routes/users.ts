import { Router } from 'express';
import { UserController } from '../controllers/users.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.get('/me', authenticate, UserController.getMe);
router.put('/me', authenticate, UserController.updateMe);
router.get('/:id', authenticate, UserController.getUser);
router.post('/:id/follow', authenticate, UserController.follow);

export default router;
