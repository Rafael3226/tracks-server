import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({ type: String, required: true })
  readonly title?: string;
  @ApiProperty({ type: String, required: true })
  readonly artist?: string;
  @ApiProperty({ type: String, required: true })
  readonly label?: string;
  @ApiProperty({ type: String, required: true })
  readonly imageUrl?: string;
  @ApiProperty({ type: String, required: true })
  readonly genre?: string;
}

export class TrackDto extends CreateTrackDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  readonly id?: string;
}
