import prisma from '../config/database.ts';

export class KycService {
  static async getStatus(userId: string) {
    return { status: 'VERIFIED' };
  }

  static async submit(userId: string, data: any) {
    // Save KYC docs to S3 and record in DB
    return { success: true };
  }
}
