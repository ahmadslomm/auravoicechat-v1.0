import prisma from '../config/database.ts';

export class DailyRewardService {
  static async getStatus(userId: string) {
    // Check if user claimed reward today
    return { can_claim: true, streak: 3 };
  }

  static async claim(userId: string) {
    // Add coins/diamonds and update last_claim
    return { success: true, reward: { coins: 100 } };
  }
}
