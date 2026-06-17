import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.ts';
import { SupportService } from '../services/support.ts';
import { sendSuccess, sendError } from '../utils/response.ts';

export class SupportController {
  static async createTicket(req: AuthRequest, res: Response) {
    try {
      const ticket = await SupportService.createTicket(req.user!.id, req.body.subject);
      return sendSuccess(res, ticket, 201);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async getTickets(req: AuthRequest, res: Response) {
    try {
      const tickets = await SupportService.getTickets(req.user!.id);
      return sendSuccess(res, tickets);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async reply(req: AuthRequest, res: Response) {
    try {
      const result = await SupportService.replyToTicket(req.params.id, req.user!.id, req.body.content);
      return sendSuccess(res, result);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
