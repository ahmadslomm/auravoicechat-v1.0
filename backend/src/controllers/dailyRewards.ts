import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.ts';
import { DailyRewardService } from '../services/dailyRewards.ts';
import { sendSuccess, sendError } from '../utils/response.ts';

export class DailyRewardController {
  static async getStatus(req: AuthRequest, res: Response) {
    try {
      const status = await DailyRewardService.getStatus(req.user!.id);
      return sendSuccess(res, status);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async claim(req: AuthRequest, res: Response) {
    try {
      const result = await DailyRewardService.claim(req.user!.id);
      return sendSuccess(res, result);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
