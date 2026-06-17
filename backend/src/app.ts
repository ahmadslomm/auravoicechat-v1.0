import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { initSocket } from './config/socket.ts';
import { connectRedis } from './config/redis.ts';
import { initSchedulers } from './utils/scheduler.ts';
import { errorHandler } from './middleware/errorHandler.ts';

// Import Routes
import authRoutes from './routes/auth.ts';
import userRoutes from './routes/users.ts';
import roomRoutes from './routes/rooms.ts';
import messageRoutes from './routes/messages.ts';
import giftRoutes from './routes/gifts.ts';
import walletRoutes from './routes/wallet.ts';
import gameRoutes from './routes/games.ts';
import eventRoutes from './routes/events.ts';
import storeRoutes from './routes/store.ts';
import inventoryRoutes from './routes/inventory.ts';
import friendRoutes from './routes/friends.ts';
import familyRoutes from './routes/family.ts';
import rankingRoutes from './routes/rankings.ts';
import earningRoutes from './routes/earning.ts';
import guideRoutes from './routes/guide.ts';
import adminRoutes from './routes/admin.ts';
import supportRoutes from './routes/support.ts';
import cinemaRoutes from './routes/cinema.ts';
import vipRoutes from './routes/vip.ts';
import medalRoutes from './routes/medals.ts';
import referralRoutes from './routes/referral.ts';
import dailyRewardRoutes from './routes/dailyRewards.ts';
import kycRoutes from './routes/kyc.ts';
import settingsRoutes from './routes/settings.ts';

// Socket Handlers
import { handleRoomSocket } from './socket/roomSocket.ts';
import { handleChatSocket } from './socket/chatSocket.ts';
import { handleCinemaSocket } from './socket/cinemaSocket.ts';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = initSocket(httpServer);

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Routes
const API_PREFIX = '/api/v1';
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/users`, userRoutes);
app.use(`${API_PREFIX}/rooms`, roomRoutes);
app.use(`${API_PREFIX}/messages`, messageRoutes);
app.use(`${API_PREFIX}/gifts`, giftRoutes);
app.use(`${API_PREFIX}/wallet`, walletRoutes);
app.use(`${API_PREFIX}/games`, gameRoutes);
app.use(`${API_PREFIX}/events`, eventRoutes);
app.use(`${API_PREFIX}/store`, storeRoutes);
app.use(`${API_PREFIX}/inventory`, inventoryRoutes);
app.use(`${API_PREFIX}/friends`, friendRoutes);
app.use(`${API_PREFIX}/family`, familyRoutes);
app.use(`${API_PREFIX}/rankings`, rankingRoutes);
app.use(`${API_PREFIX}/earning`, earningRoutes);
app.use(`${API_PREFIX}/guide`, guideRoutes);
app.use(`${API_PREFIX}/admin`, adminRoutes);
app.use(`${API_PREFIX}/support`, supportRoutes);
app.use(`${API_PREFIX}/cinema`, cinemaRoutes);
app.use(`${API_PREFIX}/vip`, vipRoutes);
app.use(`${API_PREFIX}/medals`, medalRoutes);
app.use(`${API_PREFIX}/referral`, referralRoutes);
app.use(`${API_PREFIX}/daily-rewards`, dailyRewardRoutes);
app.use(`${API_PREFIX}/kyc`, kycRoutes);
app.use(`${API_PREFIX}/settings`, settingsRoutes);

// Socket IO setup
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  handleRoomSocket(io, socket);
  handleChatSocket(io, socket);
  handleCinemaSocket(io, socket);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectRedis();
    initSchedulers();

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
