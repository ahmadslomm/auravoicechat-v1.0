import prisma from '../config/database.ts';

export class CinemaService {
  static async startCinema(roomId: string, videoUrl: string) {
    // Cinema state could be stored in Redis for real-time sync
    // Placeholder logic
    return { roomId, videoUrl, status: 'playing', position: 0 };
  }
}
