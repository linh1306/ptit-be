import { ApiProperty } from '@nestjs/swagger';

export class LessonDocumentsDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  content: string | null;
}
