import { randomUUID } from 'crypto';
import { Genre } from './genre.entity';

export type TrackProperties = {
  readonly id: string;
  title: string;
  artist: string;
  label: string;
  imageUrl: string;
  genre: Genre;
};

export class Track {
  readonly id: TrackProperties['id'];
  title: TrackProperties['title'];
  artist: TrackProperties['artist'];
  label: TrackProperties['label'];
  imageUrl: TrackProperties['imageUrl'];
  genre: TrackProperties['genre'];

  constructor(data: TrackProperties) {
    Object.assign(this, data);
  }

  static create(
    properties: Omit<TrackProperties, 'id'>,
    id: string = randomUUID(),
  ): Track {
    return new Track({
      id,
      ...properties,
    });
  }
}
