import prisma from '../config/database.ts';

export class RoomService {
  static async getPopularRooms() {
    return prisma.room.findMany({
      orderBy: { listener_count: 'desc' },
      take: 20,
      include: { owner: { select: { username: true, avatar_url: true } } }
    });
  }

  static async getRoom(roomId: string) {
    return prisma.room.findUnique({
      where: { id: roomId },
      include: {
        owner: true,
        seats: { include: { user: true } }
      }
    });
  }

  static async createRoom(ownerId: string, data: any) {
    return prisma.room.create({
      data: {
        ...data,
        owner_id: ownerId,
        seats: {
          create: Array.from({ length: data.max_seats || 10 }).map((_, i) => ({
            seat_number: i + 1
          }))
        }
      }
    });
  }

  static async joinRoom(roomId: string, userId: string) {
    return prisma.room.update({
      where: { id: roomId },
      data: { listener_count: { increment: 1 } }
    });
  }

  static async leaveRoom(roomId: string, userId: string) {
    return prisma.room.update({
      where: { id: roomId },
      data: { listener_count: { decrement: 1 } }
    });
  }

  static async takeSeat(roomId: string, userId: string, seatNumber: number) {
    return prisma.roomSeat.update({
      where: { room_id_seat_number: { room_id: roomId, seat_number: seatNumber } },
      data: { user_id: userId }
    });
  }
}
