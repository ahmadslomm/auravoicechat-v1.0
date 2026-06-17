import prisma from '../config/database.ts';

export class VipService {
  static async getStatus(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { vip_tier: true }
    });
    return user;
  }

  static async purchaseVip(userId: string, tier: number) {
    // Pricing logic here
    const cost = tier * 1000; // Example
    return prisma.user.update({
      where: { id: userId },
      data: {
        vip_tier: tier,
        diamonds: { decrement: cost }
      }
    });
  }
}
