import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.ts';
import { GiftService } from '../services/gifts.ts';
import { sendSuccess, sendError } from '../utils/response.ts';

export class GiftController {
  static async getCatalog(req: AuthRequest, res: Response) {
    try {
      const gifts = await GiftService.getCatalog();
      return sendSuccess(res, gifts);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async send(req: AuthRequest, res: Response) {
    try {
      const result = await GiftService.sendGift(req.user!.id, req.body);
      return sendSuccess(res, result);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
