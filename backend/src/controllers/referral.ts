import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.ts';
import { ReferralService } from '../services/referral.ts';
import { sendSuccess, sendError } from '../utils/response.ts';

export class ReferralController {
  static async getSummary(req: AuthRequest, res: Response) {
    try {
      const summary = await ReferralService.getSummary(req.user!.id);
      return sendSuccess(res, summary);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async bind(req: AuthRequest, res: Response) {
    try {
      const result = await ReferralService.bindReferral(req.user!.id, req.body.code);
      return sendSuccess(res, result);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
