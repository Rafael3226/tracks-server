import { Module } from '@nestjs/common';
import { PrismaService } from '@src/shared/persistence/prisma/prisma.service';
import { TrackController } from './http/rest/controller/track.controller';
import { CreateTrackUseCase } from './core/use-case/create-track.use-case';
import { ListGenreUseCase } from './core/use-case/list-genre.use-case';
import { GenreController } from './http/rest/controller/genre.controller';
import { GenreRepository } from './persistence/repository/genre.repository';
import { TrackRepository } from './persistence/repository/track.repository';

@Module({
  imports: [],
  controllers: [TrackController, GenreController],
  providers: [
    CreateTrackUseCase,
    ListGenreUseCase,
    GenreRepository,
    TrackRepository,
    PrismaService,
  ],
})
export class TrackModule {}
