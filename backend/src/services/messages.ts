import prisma from '../config/database.ts';

export class MessageService {
  static async getConversations(userId: string) {
    return prisma.conversation.findMany({
      where: {
        OR: [{ user1_id: userId }, { user2_id: userId }]
      },
      orderBy: { updated_at: 'desc' }
    });
  }

  static async getMessages(conversationId: string) {
    // This is a simplified fetch; real logic would use conversation details to find users
    // or just fetch by conversation link
    return prisma.message.findMany({
      where: {
        OR: [
          { receiver_id: conversationId }, // assuming ID mapping for simplicity
          { sender_id: conversationId }
        ]
      },
      orderBy: { created_at: 'asc' }
    });
  }

  static async sendMessage(senderId: string, data: any) {
    const message = await prisma.message.create({
      data: {
        sender_id: senderId,
        receiver_id: data.receiver_id,
        room_id: data.room_id,
        content: data.content,
        type: data.type || 'text'
      }
    });

    if (data.receiver_id) {
      // Upsert conversation
      const [u1, u2] = [senderId, data.receiver_id].sort();
      await prisma.conversation.upsert({
        where: { user1_id_user2_id: { user1_id: u1, user2_id: u2 } },
        update: { last_message: data.content, updated_at: new Date() },
        create: { user1_id: u1, user2_id: u2, last_message: data.content }
      });
    }

    return message;
  }
}
