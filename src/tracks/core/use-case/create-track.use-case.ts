import { Injectable } from '@nestjs/common';
import { TrackRepository } from '@src/tracks/persistence/repository/track.repository';
import { Track } from '../entity/track.entity';
import { GenreRepository } from '@src/tracks/persistence/repository/genre.repository';
import { GenreNotFoundException } from '../exception/genre-not-found.exception';
import { Genre } from '../entity/genre.entity';

export type CreateTrackDto = {
  title: string;
  artist: string;
  label: string;
  imageUrl: string;
  genreId: string;
};

@Injectable()
export class CreateTrackUseCase {
  constructor(
    private readonly trackRepository: TrackRepository,
    private readonly genreRepository: GenreRepository,
  ) {}

  async execute({
    title,
    artist,
    label,
    imageUrl,
    genreId,
  }: CreateTrackDto): Promise<Track> {
    const genre: Genre = await this.genreRepository.findById(genreId);
    if (!genre) {
      throw new GenreNotFoundException(genreId);
    }
    const track = Track.create({
      title,
      artist,
      label,
      imageUrl,
      genre,
    });
    await this.trackRepository.create(track);
    return track;
  }
}
