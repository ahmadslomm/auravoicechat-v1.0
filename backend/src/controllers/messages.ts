import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.ts';
import { MessageService } from '../services/messages.ts';
import { sendSuccess, sendError } from '../utils/response.ts';

export class MessageController {
  static async getConversations(req: AuthRequest, res: Response) {
    try {
      const conversations = await MessageService.getConversations(req.user!.id);
      return sendSuccess(res, conversations);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async getByConversationId(req: AuthRequest, res: Response) {
    try {
      const messages = await MessageService.getMessages(req.params.conversationId);
      return sendSuccess(res, messages);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async send(req: AuthRequest, res: Response) {
    try {
      const message = await MessageService.sendMessage(req.user!.id, req.body);
      return sendSuccess(res, message, 201);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
