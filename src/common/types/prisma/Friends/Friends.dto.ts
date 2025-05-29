import { ApiProperty } from '@nestjs/swagger';

export class FriendsDto {
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
}
