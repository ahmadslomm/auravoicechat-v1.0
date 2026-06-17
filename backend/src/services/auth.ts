import prisma from '../config/database.ts';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.ts';

export class AuthService {
  static async verifyOTP(email: string, otp: string) {
    // In a real scenario, check OTP from Redis
    // For now, we simulate a successful OTP verification and login/register
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Auto-register if user doesn't exist (assuming OTP verified)
      const username = email.split('@')[0] + Math.floor(Math.random() * 1000);
      const passwordHash = await bcrypt.hash('temporary_password', 10);
      user = await prisma.user.create({
        data: {
          email,
          username,
          password_hash: passwordHash,
        }
      });
    }

    const token = generateToken({ id: user.id, email: user.email });
    return { user, token };
  }

  static async googleLogin(idToken: string) {
    // Verify Google ID Token with AWS Cognito or Google API
    // Placeholder logic
    const email = "google_user@example.com";
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          username: "google_user_" + Date.now(),
          password_hash: "social_login",
        }
      });
    }

    const token = generateToken({ id: user.id, email: user.email });
    return { user, token };
  }
}
