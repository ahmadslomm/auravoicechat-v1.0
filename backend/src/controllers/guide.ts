import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.ts';
import { GuideService } from '../services/guide.ts';
import { sendSuccess, sendError } from '../utils/response.ts';

export class GuideController {
  static async apply(req: AuthRequest, res: Response) {
    try {
      const application = await GuideService.apply(req.user!.id, req.body);
      return sendSuccess(res, application);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async getMyApplication(req: AuthRequest, res: Response) {
    try {
      const app = await GuideService.getMyApplication(req.user!.id);
      return sendSuccess(res, app);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
