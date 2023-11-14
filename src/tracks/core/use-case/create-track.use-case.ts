import { Injectable } from '@nestjs/common';
import { TrackRepository } from '@src/tracks/persistence/repository/track.repository';
import { Track } from '../entity/track.entity';

export type CreateTrackDto = {
  title: string;
  artist: string;
  label: string;
  imageUrl: string;
  genre: string;
};

@Injectable()
export class CreateTrackUseCase {
  constructor(private readonly trackRepository: TrackRepository) {}

  async execute(params: CreateTrackDto): Promise<Track> {
    const track = Track.create(params);
    await this.trackRepository.create(track);
    return track;
  }
}
