import prisma from '../config/database.ts';

export class SupportService {
  static async createTicket(userId: string, subject: string) {
    return prisma.supportTicket.create({
      data: { user_id: userId, subject, status: 'OPEN' }
    });
  }

  static async getTickets(userId: string) {
    return prisma.supportTicket.findMany({
      where: { user_id: userId },
      include: { messages: true }
    });
  }

  static async replyToTicket(ticketId: string, senderId: string, content: string) {
    return prisma.ticketMessage.create({
      data: { ticket_id: ticketId, sender_id: senderId, content }
    });
  }
}
