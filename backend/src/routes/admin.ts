import { Router } from 'express';
import { AdminController } from '../controllers/admin.ts';
import { authenticate } from '../middleware/auth.ts';
import { isSupport, isCountryAdmin, isOwner } from '../middleware/admin.ts';

const router = Router();

router.get('/users', authenticate, isSupport, AdminController.getUsers);
router.put('/users/:id/ban', authenticate, isCountryAdmin, AdminController.banUser);
router.get('/cashouts/pending', authenticate, isCountryAdmin, AdminController.getPendingCashouts);
router.post('/cashouts/:id/approve', authenticate, isOwner, AdminController.approveCashout);

export default router;
