import prisma from '../config/database.ts';
import { FamilyRole } from '@prisma/client';

export class FamilyService {
  static async getMyFamily(userId: string) {
    const member = await prisma.familyMember.findUnique({
      where: { user_id: userId },
      include: { family: { include: { members: true } } }
    });
    return member?.family;
  }

  static async createFamily(ownerId: string, name: string) {
    return prisma.$transaction(async (tx) => {
      const family = await tx.family.create({
        data: { name, owner_id: ownerId }
      });
      await tx.familyMember.create({
        data: { family_id: family.id, user_id: ownerId, role: FamilyRole.OWNER }
      });
      return family;
    });
  }
}
