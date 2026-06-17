import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response.ts';

export const errorHandler = (err: { statusCode?: number; message?: string }, req: Request, res: Response, next: NextFunction) => {
  console.error(`[${new Date().toISOString()}] Unhandled Error:`, err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return sendError(res, message, statusCode);
};
