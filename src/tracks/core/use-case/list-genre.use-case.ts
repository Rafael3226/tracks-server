import { Injectable } from '@nestjs/common';
import { Genre } from '../entity/genre.entity';
import { GenreRepository } from '@src/tracks/persistence/repository/genre.repository';

@Injectable()
export class ListGenreUseCase {
  constructor(private readonly genreRepository: GenreRepository) {}

  async execute(): Promise<Genre[]> {
    return this.genreRepository.findAll();
  }
}
