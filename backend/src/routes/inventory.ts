import { Router } from 'express';
import { InventoryController } from '../controllers/inventory.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.get('/', authenticate, InventoryController.get);
router.post('/:id/equip', authenticate, InventoryController.equip);

export default router;
