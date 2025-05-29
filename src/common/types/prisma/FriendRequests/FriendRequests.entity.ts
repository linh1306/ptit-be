import { UsersDto } from '../Users';
import { ApiProperty } from '@nestjs/swagger';
export class FriendRequestsEntity {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  senderId: string;
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
  @ApiProperty({
    type: () => UsersDto,
    required: false,
  })
  sender?: UsersDto;
  @ApiProperty({
    type: () => UsersDto,
    required: false,
  })
  receiver?: UsersDto;
}
