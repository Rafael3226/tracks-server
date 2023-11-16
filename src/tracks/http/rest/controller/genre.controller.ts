import { Controller, Get, HttpStatus, HttpException } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { GenreDto } from '../dto/genre.dto';
import { ListGenreUseCase } from '@src/tracks/core/use-case/list-genre.use-case';

@Controller('genre')
export class TrackController {
  constructor(private readonly listGenreUseCase: ListGenreUseCase) {}

  @Get()
  @ApiOkResponse({ description: 'List all genres', type: [GenreDto] })
  async listGenres() {
    try {
      return await this.listGenreUseCase.execute();
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
