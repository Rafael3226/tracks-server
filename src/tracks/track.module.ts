import { Module } from '@nestjs/common';
import { PrismaService } from '@src/shared/persistence/prisma/prisma.service';
import { TrackController } from './http/rest/controller/track.controller';
import { CreateTrackUseCase } from './core/use-case/create-track.use-case';

@Module({
  imports: [],
  controllers: [TrackController],
  providers: [CreateTrackUseCase, PrismaService],
})
export class AppModule {}
