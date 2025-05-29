import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class LessonMultipleChoicesDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: () => Object,
  })
  questions: Prisma.JsonValue;
}
