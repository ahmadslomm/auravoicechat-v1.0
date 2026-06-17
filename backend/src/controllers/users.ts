import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.ts';
import { UserService } from '../services/users.ts';
import { sendSuccess, sendError } from '../utils/response.ts';

export class UserController {
  static async getMe(req: AuthRequest, res: Response) {
    try {
      const user = await UserService.getMe(req.user!.id);
      return sendSuccess(res, user);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async getUser(req: AuthRequest, res: Response) {
    try {
      const user = await UserService.getUserProfile(req.params.id);
      if (!user) return sendError(res, 'User not found', 404);
      return sendSuccess(res, user);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async updateMe(req: AuthRequest, res: Response) {
    try {
      const updated = await UserService.updateMe(req.user!.id, req.body);
      return sendSuccess(res, updated);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async follow(req: AuthRequest, res: Response) {
    try {
      const result = await UserService.followUser(req.user!.id, req.params.id);
      return sendSuccess(res, result);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
