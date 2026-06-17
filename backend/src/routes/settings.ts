import { Router } from 'express';
import { SettingsController } from '../controllers/settings.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.get('/faqs', authenticate, SettingsController.getFaqs);
router.get('/version', authenticate, SettingsController.getVersion);

export default router;
