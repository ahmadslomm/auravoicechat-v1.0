import { Request, Response } from 'express';
import { AuthService } from '../services/auth.ts';
import { sendSuccess, sendError } from '../utils/response.ts';
import { z } from 'zod';

const otpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

export class AuthController {
  static async sendOTP(req: Request, res: Response) {
    try {
      const { email } = req.body;
      // logic to send OTP via AWS SNS or SES
      console.log(`OTP sent to ${email}`);
      return sendSuccess(res, { message: 'OTP sent successfully' });
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async verifyOTP(req: Request, res: Response) {
    try {
      const { email, otp } = otpSchema.parse(req.body);
      const result = await AuthService.verifyOTP(email, otp);
      return sendSuccess(res, result);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async logout(req: Request, res: Response) {
    return sendSuccess(res, { message: 'Logged out successfully' });
  }

  static async googleLogin(req: Request, res: Response) {
    try {
      const { idToken } = req.body;
      const result = await AuthService.googleLogin(idToken);
      return sendSuccess(res, result);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
