import { randomUUID } from 'crypto';
import { Track } from './track.entity';

export type FileProperties = {
  readonly id: string;
  path: string;
  track: Track;
};

export class File {
  readonly id: FileProperties['id'];
  path: FileProperties['path'];

  constructor(data: FileProperties) {
    Object.assign(this, data);
  }

  static create(
    properties: Omit<FileProperties, 'id'>,
    id: string = randomUUID(),
  ): File {
    return new File({
      id,
      ...properties,
    });
  }
}
