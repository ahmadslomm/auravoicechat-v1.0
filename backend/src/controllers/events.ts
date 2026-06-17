import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.ts';
import { EventService } from '../services/events.ts';
import { sendSuccess, sendError } from '../utils/response.ts';

export class EventController {
  static async getActive(req: AuthRequest, res: Response) {
    try {
      const events = await EventService.getActiveEvents();
      return sendSuccess(res, events);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async getBanners(req: AuthRequest, res: Response) {
    try {
      const banners = await EventService.getBanners();
      return sendSuccess(res, banners);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
