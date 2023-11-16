import { PrismaClient } from '@prisma/client';
import { seedTracks } from './track.seed';
import { seedFiles } from './file.seed';

export async function seed(): Promise<void> {
  const dir = 'D:\\TRACKS\\downloads';
  const prisma = new PrismaClient();
  try {
    await seedTracks(prisma);
    await seedFiles(prisma, dir);
  } catch {
    console.log(
      'Database seed could not be completed. Probably the data already exists',
    );
    await prisma.$disconnect();
    process.exit(0);
  }
}

seed();
