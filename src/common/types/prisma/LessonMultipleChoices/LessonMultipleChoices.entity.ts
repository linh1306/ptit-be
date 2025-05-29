import { LessonsDto } from '../Lessons';
import { Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class LessonMultipleChoicesEntity {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  lessonId: string;
  @ApiProperty({
    type: () => Object,
  })
  questions: Prisma.JsonValue;
  @ApiProperty({
    type: () => LessonsDto,
    required: false,
  })
  lesson?: LessonsDto;
}
