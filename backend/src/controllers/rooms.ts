import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.ts';
import { RoomService } from '../services/rooms.ts';
import { sendSuccess, sendError } from '../utils/response.ts';

export class RoomController {
  static async getPopular(req: AuthRequest, res: Response) {
    try {
      const rooms = await RoomService.getPopularRooms();
      return sendSuccess(res, rooms);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async getById(req: AuthRequest, res: Response) {
    try {
      const room = await RoomService.getRoom(req.params.id);
      if (!room) return sendError(res, 'Room not found', 404);
      return sendSuccess(res, room);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async create(req: AuthRequest, res: Response) {
    try {
      const room = await RoomService.createRoom(req.user!.id, req.body);
      return sendSuccess(res, room, 201);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async join(req: AuthRequest, res: Response) {
    try {
      await RoomService.joinRoom(req.params.id, req.user!.id);
      return sendSuccess(res, { message: 'Joined room' });
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }

  static async takeSeat(req: AuthRequest, res: Response) {
    try {
      const seatNumber = parseInt(req.params.seatNumber);
      const result = await RoomService.takeSeat(req.params.id, req.user!.id, seatNumber);
      return sendSuccess(res, result);
    } catch (error: unknown) {
      return sendError(res, (error as Error).message);
    }
  }
}
