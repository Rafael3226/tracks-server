import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CreateTrackUseCase } from '@src/tracks/core/use-case/create-track.use-case';
import { CreateTrackDto, TrackDto } from '../dto/track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly createTrackUseCase: CreateTrackUseCase) {}

  @Post()
  @ApiOkResponse({ description: 'Created Track', type: [TrackDto] })
  async createTrack(@Body() createTrackDto: CreateTrackDto) {
    try {
      return await this.createTrackUseCase.execute({
        title: createTrackDto.title,
        artist: createTrackDto.artist,
        label: createTrackDto.label,
        imageUrl: createTrackDto.imageUrl,
        genre: createTrackDto.genre,
      });
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
