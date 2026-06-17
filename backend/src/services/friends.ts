import prisma from '../config/database.ts';

export class FriendService {
  static async getFriends(userId: string) {
    return prisma.friend.findMany({
      where: {
        OR: [{ user_id: userId }, { friend_id: userId }],
        status: 'ACCEPTED'
      },
      include: {
        user: { select: { id: true, username: true, avatar_url: true } },
        friend: { select: { id: true, username: true, avatar_url: true } }
      }
    });
  }

  static async sendRequest(userId: string, targetId: string) {
    return prisma.friend.create({
      data: {
        user_id: userId,
        friend_id: targetId,
        status: 'PENDING'
      }
    });
  }

  static async acceptRequest(userId: string, requestId: string) {
    return prisma.friend.update({
      where: { id: requestId },
      data: { status: 'ACCEPTED' }
    });
  }
}
