import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateLessonMultipleChoicesDto {
  @ApiProperty({
    type: () => Object,
    required: false,
  })
  @IsOptional()
  questions: Prisma.InputJsonValue;
}
