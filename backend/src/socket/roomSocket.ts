import { Server } from 'socket.io';
import { AuthenticatedSocket } from '../config/socket.ts';

export const handleRoomSocket = (io: Server, socket: AuthenticatedSocket) => {
  socket.on('join_room', (data: { roomId: string; userId: string }) => {
    const { roomId, userId } = data;
    socket.join(roomId);
    console.log(`User ${userId} joined room ${roomId}`);
    io.to(roomId).emit('user_joined', { userId });
  });

  socket.on('leave_room', (data: { roomId: string; userId: string }) => {
    const { roomId, userId } = data;
    socket.leave(roomId);
    console.log(`User ${userId} left room ${roomId}`);
    io.to(roomId).emit('user_left', { userId });
  });

  socket.on('room_message', (data: { roomId: string; message: string }) => {
    const { roomId, message } = data;
    io.to(roomId).emit('room_message_received', {
      message,
      sender: socket.user,
      timestamp: new Date()
    });
  });

  socket.on('seat_taken', (data: { roomId: string; seatNumber: number; user: unknown }) => {
    const { roomId, seatNumber, user } = data;
    io.to(roomId).emit('seat_taken', { roomId, seatNumber, user });
  });
};
