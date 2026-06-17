import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const initSchedulers = () => {
  // Reset targets every month on the 1st at 00:00 UTC
  cron.schedule('0 0 1 * *', async () => {
    console.log('Running monthly reset of earnings and targets...');
    try {
      // In a real scenario, you'd reset monthly stats here
      // For example, updating a 'monthly_diamonds' field to 0
      // await prisma.user.updateMany({ data: { monthly_diamonds: 0 } });
      console.log('Monthly reset completed.');
    } catch (error) {
      console.error('Error in monthly reset scheduler:', error);
    }
  }, {
    timezone: "UTC"
  });

  // Daily cleanup or status updates could go here
  cron.schedule('0 0 * * *', () => {
    console.log('Running daily maintenance tasks...');
  });
};
