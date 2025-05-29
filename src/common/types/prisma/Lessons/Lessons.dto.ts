import { LessonType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class LessonsDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  name: string | null;
  @ApiProperty({
    type: 'string',
  })
  subjectId: string;
  @ApiProperty({
    enum: LessonType,
    enumName: 'LessonType',
    nullable: true,
  })
  type: LessonType | null;
}
