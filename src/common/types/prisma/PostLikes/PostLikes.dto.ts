import { ApiProperty } from '@nestjs/swagger';

export class PostLikesDto {
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
}
