import { Injectable } from '@nestjs/common';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { PersistenceValidationException } from '@src/shared/persistence/exception/persistence-validatio.exception';
import { PersistenceException } from '@src/shared/persistence/exception/persistence.exception';
import { PrismaService } from '@src/shared/persistence/prisma/prisma.service';
import { Track } from '@src/tracks/core/entity/track.entity';

@Injectable()
export class TrackRepository {
  private readonly model: PrismaService['track'];

  constructor(private readonly prismaService: PrismaService) {
    this.model = this.prismaService.track;
  }

  async create(track: Track) {
    try {
      await this.model.create({
        data: {
          id: track.id,
          title: track.title,
          artist: track.artist,
          label: track.label,
          imageUrl: track.imageUrl,
          genre: track.genre,
          isDownloaded: track.isDownloaded,
        },
      });
    } catch (error) {
      this.handleAndThrowError(error);
    }
  }

  protected handleAndThrowError(error: unknown): never {
    const errorMessage = this.extractErrorMessage(error);
    if (error instanceof PrismaClientValidationError) {
      throw new PersistenceValidationException(error.message, error);
    }
    throw new PersistenceException(errorMessage, error);
  }

  private extractErrorMessage(error: unknown): string {
    if (error instanceof Error && error.message) {
      return error.message;
    }
    return 'An unexpected error occurred.';
  }
}
