import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.ts';
import { VipService } from '../services/vip.ts';
import { sendSuccess, sendError } from '../utils/response.ts';

export class VipController {
  static async getStatus(req: AuthRequest, res: Response) {
    try {
      const status = await VipService.getStatus(req.user!.id);
      return sendSuccess(res, status);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async purchase(req: AuthRequest, res: Response) {
    try {
      const result = await VipService.purchaseVip(req.user!.id, req.body.tier);
      return sendSuccess(res, result);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
