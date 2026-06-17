import prisma from '../config/database.ts';

export class InventoryService {
  static async getInventory(userId: string) {
    // This would fetch from a table mapping users to items (not yet in schema, can use medals as proxy)
    return prisma.userMedal.findMany({
      where: { user_id: userId },
      include: { medal: true }
    });
  }

  static async equipMedal(userId: string, medalId: string) {
    return prisma.userMedal.update({
      where: { user_id_medal_id: { user_id: userId, medal_id: medalId } },
      data: { equipped: true }
    });
  }
}
