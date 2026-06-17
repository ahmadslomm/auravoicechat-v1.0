import prisma from '../config/database.ts';

export class EarningService {
  static async getStatus(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { diamonds: true, xp: true }
    });
    // logic to calculate monthly target progress
    return { current_diamonds: user?.diamonds, target: 30000 };
  }

  static async requestCashout(userId: string, data: any) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.diamonds < data.diamonds_used) throw new Error('Insufficient diamonds');

    const amountUsd = (data.diamonds_used / 100000) * 30; // $30 per 100k
    if (amountUsd < 10) throw new Error('Minimum cashout is $10');

    const clearanceDate = new Date();
    clearanceDate.setDate(clearanceDate.getDate() + 5); // 5 days mandatory clearance

    return prisma.cashoutRequest.create({
      data: {
        user_id: userId,
        amount_usd: amountUsd,
        diamonds_used: data.diamonds_used,
        payment_method: data.payment_method,
        payment_details: data.payment_details,
        clearance_date: clearanceDate,
        status: 'PENDING_CLEARANCE'
      }
    });
  }
}
