import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.ts';
import { FriendService } from '../services/friends.ts';
import { sendSuccess, sendError } from '../utils/response.ts';

export class FriendController {
  static async get(req: AuthRequest, res: Response) {
    try {
      const friends = await FriendService.getFriends(req.user!.id);
      return sendSuccess(res, friends);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async request(req: AuthRequest, res: Response) {
    try {
      const result = await FriendService.sendRequest(req.user!.id, req.params.userId);
      return sendSuccess(res, result);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async accept(req: AuthRequest, res: Response) {
    try {
      const result = await FriendService.acceptRequest(req.user!.id, req.params.id);
      return sendSuccess(res, result);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
