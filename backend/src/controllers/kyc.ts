import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.ts';
import { KycService } from '../services/kyc.ts';
import { sendSuccess, sendError } from '../utils/response.ts';

export class KycController {
  static async getStatus(req: AuthRequest, res: Response) {
    try {
      const status = await KycService.getStatus(req.user!.id);
      return sendSuccess(res, status);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async submit(req: AuthRequest, res: Response) {
    try {
      const result = await KycService.submit(req.user!.id, req.body);
      return sendSuccess(res, result);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
