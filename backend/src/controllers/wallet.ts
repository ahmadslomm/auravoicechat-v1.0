import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.ts';
import { WalletService } from '../services/wallet.ts';
import { sendSuccess, sendError } from '../utils/response.ts';

export class WalletController {
  static async getBalances(req: AuthRequest, res: Response) {
    try {
      const balances = await WalletService.getBalances(req.user!.id);
      return sendSuccess(res, balances);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async exchange(req: AuthRequest, res: Response) {
    try {
      const { diamonds } = req.body;
      const result = await WalletService.exchangeDiamondsToCoins(req.user!.id, diamonds);
      return sendSuccess(res, result);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async getTransactions(req: AuthRequest, res: Response) {
    try {
      const txs = await WalletService.getTransactions(req.user!.id);
      return sendSuccess(res, txs);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
