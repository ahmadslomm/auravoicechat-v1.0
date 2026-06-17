import prisma from '../config/database.ts';

export class GiftService {
  static async getCatalog() {
    return prisma.gift.findMany({ where: { is_active: true } });
  }

  static async sendGift(senderId: string, data: any) {
    const gift = await prisma.gift.findUnique({ where: { id: data.gift_id } });
    if (!gift) throw new Error('Gift not found');

    const sender = await prisma.user.findUnique({ where: { id: senderId } });
    if (!sender || sender.diamonds < gift.price_diamonds * (data.quantity || 1)) {
      throw new Error('Insufficient diamonds');
    }

    const totalCost = gift.price_diamonds * (data.quantity || 1);

    // Transaction to deduct diamonds and record gift
    return prisma.$transaction([
      prisma.user.update({
        where: { id: senderId },
        data: { diamonds: { decrement: totalCost } }
      }),
      prisma.user.update({
        where: { id: data.receiver_id },
        data: { xp: { increment: Math.floor(totalCost / 10) } } // Example XP gain
      }),
      prisma.giftTransaction.create({
        data: {
          sender_id: senderId,
          receiver_id: data.receiver_id,
          room_id: data.room_id,
          gift_id: data.gift_id,
          quantity: data.quantity || 1,
          total_diamonds: totalCost
        }
      })
    ]);
  }
}
