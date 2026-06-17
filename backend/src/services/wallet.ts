import prisma from '../config/database.ts';

export class WalletService {
  static async getBalances(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { coins: true, diamonds: true }
    });
    return user;
  }

  static async exchangeDiamondsToCoins(userId: string, diamonds: number) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.diamonds < diamonds) throw new Error('Insufficient diamonds');

    const coinsToAdd = Math.floor(diamonds * 0.3); // 100k diamonds = 30k coins (30%)

    return prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          diamonds: { decrement: diamonds },
          coins: { increment: coinsToAdd }
        }
      }),
      prisma.walletTransaction.create({
        data: {
          user_id: userId,
          type: 'EXCHANGE',
          amount: diamonds,
          currency: 'DIAMONDS',
          status: 'COMPLETED',
          reference: `EXCHANGE_TO_${coinsToAdd}_COINS`
        }
      })
    ]);
  }

  static async getTransactions(userId: string) {
    return prisma.walletTransaction.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' }
    });
  }
}
