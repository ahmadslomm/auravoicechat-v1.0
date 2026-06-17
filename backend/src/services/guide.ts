import prisma from '../config/database.ts';
import { Gender } from '@prisma/client';

export class GuideService {
  static async apply(userId: string, data: any) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    if (user.gender !== Gender.FEMALE) throw new Error('Guide program is for females only');
    if (user.is_banned) throw new Error('Banned users cannot apply');

    return prisma.guideApplication.create({
      data: {
        user_id: userId,
        languages: data.languages,
        experience: data.experience,
        motivation: data.motivation,
        available_hours: data.available_hours,
        status: 'PENDING'
      }
    });
  }

  static async getMyApplication(userId: string) {
    return prisma.guideApplication.findUnique({ where: { user_id: userId } });
  }
}
