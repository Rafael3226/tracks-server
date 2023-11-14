import { randomUUID } from 'crypto';

export type TrackProperties = {
  readonly id: string;
  title: string;
  artist: string;
  label: string;
  imageUrl: string;
  genre: string;
  isDownloaded: boolean;
};

export class Track {
  readonly id: TrackProperties['id'];
  title: TrackProperties['title'];
  artist: TrackProperties['artist'];
  label: TrackProperties['label'];
  imageUrl: TrackProperties['imageUrl'];
  genre: TrackProperties['genre'];
  isDownloaded: TrackProperties['isDownloaded'];

  constructor(data: TrackProperties) {
    Object.assign(this, data);
  }

  static create(
    properties: Omit<TrackProperties, 'id'>,
    id: string = randomUUID(),
  ): Track {
    return new Track({
      ...properties,
      id,
      imageUrl: properties.imageUrl || '',
    });
  }
}
