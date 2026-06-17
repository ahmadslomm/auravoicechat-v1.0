import { PrismaClient, AdminLevel, Gender } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('MnIHbK123xD', 10);

  // Seed Owner Admin
  const owner = await prisma.user.upsert({
    where: { email: 'Hamziii886@gmail.com' },
    update: {},
    create: {
      id: 'owner_admin_001',
      username: 'OwnerAdmin',
      email: 'Hamziii886@gmail.com',
      password_hash: passwordHash,
      gender: Gender.MALE,
      level: 100,
      is_online: false,
      admin_profile: {
        create: {
          email: 'Hamziii886@gmail.com',
          name: 'Super Owner',
          admin_level: AdminLevel.OWNER,
          is_active: true,
        },
      },
    },
  });

  console.log('Seeded Owner Admin:', owner.email);

  // Seed Customer Support Room
  const supportRoom = await prisma.room.upsert({
    where: { id: 'customer_support_001' },
    update: {},
    create: {
      id: 'customer_support_001',
      owner_id: owner.id,
      name: 'Aura Support Center 🎧',
      description: 'Get help from our 24/7 support team',
      is_permanent: true,
      is_official: true,
      max_seats: 10,
    },
  });

  console.log('Seeded Support Room:', supportRoom.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
