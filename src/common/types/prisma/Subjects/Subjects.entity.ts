import { LessonsDto } from '../Lessons';
import { ApiProperty } from '@nestjs/swagger';
export class SubjectsEntity {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  code: string;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: () => LessonsDto,
    isArray: true,
    required: false,
  })
  lessons?: LessonsDto[];
}
