import prisma from '../config/database.ts';

export class MedalService {
  static async getAllMedals() {
    return prisma.medal.findMany({ where: { is_active: true } });
  }

  static async getMyMedals(userId: string) {
    return prisma.userMedal.findMany({
      where: { user_id: userId },
      include: { medal: true }
    });
  }
}
