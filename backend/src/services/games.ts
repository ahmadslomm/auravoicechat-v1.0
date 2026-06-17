import prisma from '../config/database.ts';

export class GameService {
  static async getJackpots() {
    return prisma.jackpot.findMany();
  }

  static async startGame(userId: string, gameType: string, bet: number) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.diamonds < bet) throw new Error('Insufficient diamonds');

    // Simple game logic: 50% chance to win double
    const win = Math.random() > 0.5;
    const winnings = win ? bet * 2 : 0;
    const result = win ? 'WIN' : 'LOSE';

    return prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { diamonds: { decrement: bet, increment: winnings } }
      }),
      prisma.gameSession.create({
        data: {
          user_id: userId,
          game_type: gameType,
          bet_diamonds: bet,
          result: result,
          winnings_diamonds: winnings
        }
      })
    ]);
  }
}
