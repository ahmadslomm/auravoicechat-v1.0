import { Router } from 'express';
import { MessageController } from '../controllers/messages.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.get('/conversations', authenticate, MessageController.getConversations);
router.get('/:conversationId', authenticate, MessageController.getByConversationId);
router.post('/send', authenticate, MessageController.send);

export default router;
