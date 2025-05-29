import { ApiProperty } from '@nestjs/swagger';

export class CommentsDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  content: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  commentId: string | null;
  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  tags: string[];
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
}
