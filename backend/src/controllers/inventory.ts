import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.ts';
import { InventoryService } from '../services/inventory.ts';
import { sendSuccess, sendError } from '../utils/response.ts';

export class InventoryController {
  static async get(req: AuthRequest, res: Response) {
    try {
      const items = await InventoryService.getInventory(req.user!.id);
      return sendSuccess(res, items);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async equip(req: AuthRequest, res: Response) {
    try {
      const result = await InventoryService.equipMedal(req.user!.id, req.params.id);
      return sendSuccess(res, result);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
