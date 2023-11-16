import { randomUUID } from 'crypto';

export type GenreProperties = {
  readonly id: string;
  name: string;
};

export class Genre {
  readonly id: GenreProperties['id'];
  name: GenreProperties['name'];

  constructor(data: GenreProperties) {
    Object.assign(this, data);
  }

  static create(
    properties: Omit<GenreProperties, 'id'>,
    id: string = randomUUID(),
  ): Genre {
    return new Genre({
      id,
      ...properties,
    });
  }
}
