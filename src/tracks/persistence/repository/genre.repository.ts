import { Injectable } from '@nestjs/common';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { PersistenceValidationException } from '@src/shared/persistence/exception/persistence-validatio.exception';
import { PersistenceException } from '@src/shared/persistence/exception/persistence.exception';
import { PrismaService } from '@src/shared/persistence/prisma/prisma.service';
import { Genre } from '@src/tracks/core/entity/genre.entity';

@Injectable()
export class GenreRepository {
  private readonly model: PrismaService['genre'];

  constructor(private readonly prismaService: PrismaService) {
    this.model = this.prismaService.genre;
  }

  async create(genre: Genre): Promise<void> {
    try {
      await this.model.create({
        data: {
          id: genre.id,
          name: genre.name,
        },
      });
    } catch (error) {
      this.handleAndThrowError(error);
    }
  }

  async findAll(): Promise<Genre[]> {
    try {
      const equipment = await this.model.findMany();
      return equipment.map((e) => Genre.create(e));
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
