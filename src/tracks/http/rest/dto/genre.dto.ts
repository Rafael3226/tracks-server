import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GenreDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  readonly id: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true })
  readonly name: string;
}
