import { SubjectsDto } from '../Subjects';
import { LessonDocumentsDto } from '../LessonDocuments';
import { LessonMultipleChoicesDto } from '../LessonMultipleChoices';
import { LessonType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class LessonsEntity {
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
  @ApiProperty({
    type: () => SubjectsDto,
    required: false,
  })
  subject?: SubjectsDto;
  @ApiProperty({
    type: () => LessonDocumentsDto,
    required: false,
    nullable: true,
  })
  lessonDocument?: LessonDocumentsDto | null;
  @ApiProperty({
    type: () => LessonMultipleChoicesDto,
    required: false,
    nullable: true,
  })
  lessonMultipleChoice?: LessonMultipleChoicesDto | null;
}
