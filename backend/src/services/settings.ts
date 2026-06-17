import prisma from '../config/database.ts';

export class SettingsService {
  static async getFaqs() {
    return [{ question: 'How to earn diamonds?', answer: 'Receive gifts from others.' }];
  }

  static async getVersion() {
    return { version: '1.0.0', mandatory_update: false };
  }
}
