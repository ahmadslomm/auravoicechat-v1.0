import { Server } from 'socket.io';
import { AuthenticatedSocket } from '../config/socket.ts';

export const handleChatSocket = (io: Server, socket: AuthenticatedSocket) => {
  socket.on('send_message', (data: { conversationId: string; content: string; type: string }) => {
    const { conversationId, content, type } = data;
    // In a real app, find the other user in the conversation and emit to their private room
    io.emit('message_received', {
      conversationId,
      content,
      type,
      sender: socket.user,
      timestamp: new Date()
    });
  });

  socket.on('typing', (data: { conversationId: string }) => {
    io.emit('typing', { conversationId: data.conversationId, userId: socket.user?.id });
  });
};
