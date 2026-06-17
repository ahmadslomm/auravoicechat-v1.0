import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.ts';
import { FamilyService } from '../services/family.ts';
import { sendSuccess, sendError } from '../utils/response.ts';

export class FamilyController {
  static async getMine(req: AuthRequest, res: Response) {
    try {
      const family = await FamilyService.getMyFamily(req.user!.id);
      return sendSuccess(res, family);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async create(req: AuthRequest, res: Response) {
    try {
      const { name } = req.body;
      const family = await FamilyService.createFamily(req.user!.id, name);
      return sendSuccess(res, family, 201);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
