import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.ts';
import { GameService } from '../services/games.ts';
import { sendSuccess, sendError } from '../utils/response.ts';

export class GameController {
  static async getJackpots(req: AuthRequest, res: Response) {
    try {
      const jackpots = await GameService.getJackpots();
      return sendSuccess(res, jackpots);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async start(req: AuthRequest, res: Response) {
    try {
      const { gameType, bet } = req.body;
      const result = await GameService.startGame(req.user!.id, gameType, bet);
      return sendSuccess(res, result);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
