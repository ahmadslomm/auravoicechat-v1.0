import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.ts';
import { EarningService } from '../services/earning.ts';
import { sendSuccess, sendError } from '../utils/response.ts';

export class EarningController {
  static async getStatus(req: AuthRequest, res: Response) {
    try {
      const status = await EarningService.getStatus(req.user!.id);
      return sendSuccess(res, status);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async cashout(req: AuthRequest, res: Response) {
    try {
      const request = await EarningService.requestCashout(req.user!.id, req.body);
      return sendSuccess(res, request);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
