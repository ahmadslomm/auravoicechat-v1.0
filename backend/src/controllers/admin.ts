import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.ts';
import { AdminService } from '../services/admin.ts';
import { sendSuccess, sendError } from '../utils/response.ts';

export class AdminController {
  static async getUsers(req: AuthRequest, res: Response) {
    try {
      const users = await AdminService.getAllUsers();
      return sendSuccess(res, users);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async banUser(req: AuthRequest, res: Response) {
    try {
      const result = await AdminService.banUser(req.params.id);
      return sendSuccess(res, result);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async getPendingCashouts(req: AuthRequest, res: Response) {
    try {
      const requests = await AdminService.getPendingCashouts();
      return sendSuccess(res, requests);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async approveCashout(req: AuthRequest, res: Response) {
    try {
      const result = await AdminService.approveCashout(req.params.id, req.user!.id);
      return sendSuccess(res, result);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
