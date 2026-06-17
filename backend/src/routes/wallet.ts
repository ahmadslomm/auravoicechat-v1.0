import { Router } from 'express';
import { WalletController } from '../controllers/wallet.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

router.get('/balances', authenticate, WalletController.getBalances);
router.post('/exchange', authenticate, WalletController.exchange);
router.get('/transactions', authenticate, WalletController.getTransactions);

export default router;
