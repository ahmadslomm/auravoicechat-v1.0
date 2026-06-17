import { Server, Socket } from 'socket.io';

export const handleCinemaSocket = (io: Server, socket: Socket) => {
  socket.on('cinema_play', (data) => {
    const { cinemaId, position } = data;
    io.emit('cinema_sync', { cinemaId, position, isPlaying: true });
  });

  socket.on('cinema_pause', (data) => {
    const { cinemaId, position } = data;
    io.emit('cinema_sync', { cinemaId, position, isPlaying: false });
  });

  socket.on('cinema_seek', (data) => {
    const { cinemaId, position } = data;
    io.emit('cinema_sync', { cinemaId, position, isPlaying: true });
  });
};
