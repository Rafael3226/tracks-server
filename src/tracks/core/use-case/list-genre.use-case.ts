import { GenreRepository } from '@src/tracks/persistence/repository/genre.repository';
import { Genre } from '../entity/genre.entity';

export class ListGenreUseCase {
  constructor(private readonly genreRepository: GenreRepository) {}

  async execute(): Promise<Genre[]> {
    return this.genreRepository.findAll();
  }
}
