import prisma from '../config/database.ts';

export class UserService {
  static async getMe(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        admin_profile: true,
        medals: { include: { medal: true } },
      }
    });
  }

  static async getUserProfile(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        avatar_url: true,
        gender: true,
        level: true,
        vip_tier: true,
        is_online: true,
        created_at: true,
      }
    });
  }

  static async updateMe(userId: string, data: any) {
    return prisma.user.update({
      where: { id: userId },
      data
    });
  }

  static async followUser(userId: string, targetId: string) {
    return prisma.friend.create({
      data: {
        user_id: userId,
        friend_id: targetId,
        status: 'ACCEPTED' // following is simplified as a friend entry for now
      }
    });
  }
}
