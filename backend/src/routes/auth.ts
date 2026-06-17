import { Router } from 'express';
import { AuthController } from '../controllers/auth.ts';

const router = Router();

router.post('/send-otp', AuthController.sendOTP);
router.post('/verify-otp', AuthController.verifyOTP);
router.post('/logout', AuthController.logout);
router.post('/google', AuthController.googleLogin);
// facebook, refresh-token would be similar

export default router;
