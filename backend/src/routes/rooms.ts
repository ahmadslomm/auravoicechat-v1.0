import { Router } from 'express';
import { RoomController } from '../controllers/rooms.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.get('/popular', authenticate, RoomController.getPopular);
router.get('/:id', authenticate, RoomController.getById);
router.post('/', authenticate, RoomController.create);
router.post('/:id/join', authenticate, RoomController.join);
router.put('/:id/seats/:seatNumber', authenticate, RoomController.takeSeat);

export default router;
