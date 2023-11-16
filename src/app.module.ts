import { Module } from '@nestjs/common';
import { TrackModule } from './tracks/track.module';

@Module({
  imports: [TrackModule],
})
export class AppModule {}
