import prisma from '../config/database.ts';

export class RankingService {
  static async getTopSenders() {
    return prisma.user.findMany({
      orderBy: { diamonds: 'desc' }, // In real app, use a dedicated total_sent field
      take: 50,
      select: { id: true, username: true, avatar_url: true, diamonds: true }
    });
  }

  static async getTopFamilies() {
    return prisma.family.findMany({
      orderBy: { total_diamonds: 'desc' },
      take: 10
    });
  }
}
