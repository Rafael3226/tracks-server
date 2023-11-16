import { PrismaClient } from '@prisma/client';
import { readJsonFile } from '../../../util/read-json-file';
import { randomUUID } from 'crypto';

export async function seedTracks(prisma: PrismaClient): Promise<void> {
  const dataFile = './src/shared/persistence/prisma/seed/tracks.json';
  const tracksData = readJsonFile(dataFile);
  if (!tracksData) throw new Error('Is not possible to load json.');
  const genreMap = new Map();

  for (const t of tracksData) {
    const genreName: string = t['genre'] || '';
    if (!genreMap.has(genreName)) {
      const genre = { id: randomUUID(), name: genreName };
      await prisma.genre.create({ data: genre });
      genreMap.set(genreName, genre.id);
    }

    const id: string = randomUUID();
    await prisma.track.create({
      data: {
        id,
        title: t['title'] || '',
        artist: t['artist'] || '',
        label: t['label'] || '',
        imageUrl: t['imageURL'] || '',
        genreId: genreMap.get(genreName),
      },
    });
  }
}
