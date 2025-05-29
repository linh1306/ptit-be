import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateLessonMultipleChoicesDto {
  @ApiProperty({
    type: () => Object,
  })
  @IsNotEmpty()
  questions: Prisma.InputJsonValue;
}
