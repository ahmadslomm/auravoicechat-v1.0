import { Router } from 'express';
import { SupportController } from '../controllers/support.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.post('/tickets', authenticate, SupportController.createTicket);
router.get('/tickets', authenticate, SupportController.getTickets);
router.post('/tickets/:id/reply', authenticate, SupportController.reply);

export default router;
