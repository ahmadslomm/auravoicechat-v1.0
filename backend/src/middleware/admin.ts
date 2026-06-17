import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.ts';
import { sendError } from '../utils/response.ts';
import { AdminLevel } from '@prisma/client';

const levelHierarchy: Record<AdminLevel, number> = {
  [AdminLevel.OWNER]: 6,
  [AdminLevel.COUNTRY_ADMIN]: 5,
  [AdminLevel.ADMIN_L1]: 4,
  [AdminLevel.ADMIN_L2]: 3,
  [AdminLevel.ADMIN_L3]: 2,
  [AdminLevel.CUSTOMER_SUPPORT]: 1,
};

export const authorizeAdmin = (requiredLevel: AdminLevel) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.admin_level) {
      return sendError(res, 'Admin access required', 403);
    }

    const userLevel = req.user.admin_level as AdminLevel;
    if (levelHierarchy[userLevel] < levelHierarchy[requiredLevel]) {
      return sendError(res, 'Insufficient admin permissions', 403);
    }

    next();
  };
};

export const isOwner = authorizeAdmin(AdminLevel.OWNER);
export const isCountryAdmin = authorizeAdmin(AdminLevel.COUNTRY_ADMIN);
export const isSupport = authorizeAdmin(AdminLevel.CUSTOMER_SUPPORT);
