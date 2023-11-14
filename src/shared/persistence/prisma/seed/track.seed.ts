import { PrismaClient } from '@prisma/client';
import { readJsonFile } from '../../../util/readJsonFile';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  const dataFile = './src/shared/persistence/prisma/seed/tracks.json';
  const tracksData = readJsonFile(dataFile);
  if (!tracksData) throw new Error('Is not possible to load json.');
  tracksData.forEach(async (t) => {
    const id: string = randomUUID();
    await prisma.track.create({
      data: {
        id,
        title: t['title'] || '',
        artist: t['artist'] || '',
        label: t['label'] || '',
        imageUrl: t['imageURL'] || '',
        genre: t['genre'] || '',
        isDownloaded: false,
      },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    console.log(
      'Database seed could not be completed. Probably the data already exists',
    );
    await prisma.$disconnect();
    process.exit(0);
  });
