import { ApiProperty } from '@nestjs/swagger';

export class FriendRequestsDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  receiverId: string;
  @ApiProperty({
    type: 'string',
  })
  status: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
}
