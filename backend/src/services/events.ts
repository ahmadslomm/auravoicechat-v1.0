import prisma from '../config/database.ts';

export class EventService {
  static async getActiveEvents() {
    const now = new Date();
    return prisma.event.findMany({
      where: {
        is_active: true,
        start_date: { lte: now },
        end_date: { gte: now }
      }
    });
  }

  static async getBanners() {
    return prisma.event.findMany({
      where: { is_active: true },
      select: { id: true, banner_url: true, title: true }
    });
  }
}
