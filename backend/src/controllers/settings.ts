import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.ts';
import { SettingsService } from '../services/settings.ts';
import { sendSuccess, sendError } from '../utils/response.ts';

export class SettingsController {
  static async getFaqs(req: AuthRequest, res: Response) {
    try {
      const faqs = await SettingsService.getFaqs();
      return sendSuccess(res, faqs);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async getVersion(req: AuthRequest, res: Response) {
    try {
      const version = await SettingsService.getVersion();
      return sendSuccess(res, version);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
