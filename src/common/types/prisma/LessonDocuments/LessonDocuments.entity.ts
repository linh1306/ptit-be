import { LessonsDto } from '../Lessons';
import { ApiProperty } from '@nestjs/swagger';
export class LessonDocumentsEntity {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  lessonId: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  content: string | null;
  @ApiProperty({
    type: () => LessonsDto,
    required: false,
  })
  lesson?: LessonsDto;
}
