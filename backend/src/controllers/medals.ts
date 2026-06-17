import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.ts';
import { MedalService } from '../services/medals.ts';
import { sendSuccess, sendError } from '../utils/response.ts';

export class MedalController {
  static async getAll(req: AuthRequest, res: Response) {
    try {
      const medals = await MedalService.getAllMedals();
      return sendSuccess(res, medals);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async getMine(req: AuthRequest, res: Response) {
    try {
      const medals = await MedalService.getMyMedals(req.user!.id);
      return sendSuccess(res, medals);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
