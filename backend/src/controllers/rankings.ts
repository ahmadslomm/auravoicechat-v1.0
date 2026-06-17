import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.ts';
import { RankingService } from '../services/rankings.ts';
import { sendSuccess, sendError } from '../utils/response.ts';

export class RankingController {
  static async getSenders(req: AuthRequest, res: Response) {
    try {
      const rankings = await RankingService.getTopSenders();
      return sendSuccess(res, rankings);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async getFamilies(req: AuthRequest, res: Response) {
    try {
      const families = await RankingService.getTopFamilies();
      return sendSuccess(res, families);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
