import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.ts';
import { sendError } from '../utils/response.ts';
import prisma from '../config/database.ts';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    admin_level?: string;
  };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Authorization header missing or invalid', 401);
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return sendError(res, 'Invalid or expired token', 401);
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    include: { admin_profile: true }
  });

  if (!user) {
    return sendError(res, 'User not found', 404);
  }

  if (user.is_banned) {
    return sendError(res, 'User is banned', 403);
  }

  req.user = {
    id: user.id,
    email: user.email,
    admin_level: user.admin_profile?.admin_level
  };

  next();
};
