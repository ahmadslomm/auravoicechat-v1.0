import prisma from '../config/database.ts';

export class StoreService {
  static async getCatalog() {
    // For now, reuse gifts or a separate table if needed
    // Assuming gifts are in store
    return prisma.gift.findMany({ where: { is_active: true } });
  }

  static async purchaseItem(userId: string, itemId: string) {
    const item = await prisma.gift.findUnique({ where: { id: itemId } });
    if (!item) throw new Error('Item not found');

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.diamonds < item.price_diamonds) throw new Error('Insufficient diamonds');

    return prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { diamonds: { decrement: item.price_diamonds } }
      }),
      // Logic to add to inventory could go here
    ]);
  }
}
