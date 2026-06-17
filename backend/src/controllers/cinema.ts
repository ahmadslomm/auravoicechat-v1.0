import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.ts';
import { CinemaService } from '../services/cinema.ts';
import { sendSuccess, sendError } from '../utils/response.ts';

export class CinemaController {
  static async start(req: AuthRequest, res: Response) {
    try {
      const result = await CinemaService.startCinema(req.body.roomId, req.body.videoUrl);
      return sendSuccess(res, result);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
