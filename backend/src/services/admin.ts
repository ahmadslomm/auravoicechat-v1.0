import prisma from '../config/database.ts';

export class AdminService {
  static async getAllUsers() {
    return prisma.user.findMany({
      include: { admin_profile: true }
    });
  }

  static async banUser(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { is_banned: true }
    });
  }

  static async getPendingCashouts() {
    return prisma.cashoutRequest.findMany({
      where: { status: 'PENDING_APPROVAL' },
      include: { user: true }
    });
  }

  static async approveCashout(requestId: string, adminId: string) {
    return prisma.cashoutRequest.update({
      where: { id: requestId },
      data: {
        status: 'APPROVED',
        approved_by: adminId,
        approved_at: new Date()
      }
    });
  }
}
