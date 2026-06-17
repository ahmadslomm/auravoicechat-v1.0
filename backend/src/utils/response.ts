import { Response } from 'express';

export const sendSuccess = (res: Response, data: unknown, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

export const sendError = (res: Response, error: string, statusCode = 400) => {
  console.error(`[${new Date().toISOString()}] Error: ${error}`);
  return res.status(statusCode).json({
    success: false,
    error,
  });
};
