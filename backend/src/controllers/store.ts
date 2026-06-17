import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.ts';
import { StoreService } from '../services/store.ts';
import { sendSuccess, sendError } from '../utils/response.ts';

export class StoreController {
  static async getCatalog(req: AuthRequest, res: Response) {
    try {
      const items = await StoreService.getCatalog();
      return sendSuccess(res, items);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async purchase(req: AuthRequest, res: Response) {
    try {
      const result = await StoreService.purchaseItem(req.user!.id, req.params.id);
      return sendSuccess(res, result);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
