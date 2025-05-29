import { UsersDto } from '../Users';
import { ApiProperty } from '@nestjs/swagger';
export class FriendsEntity {
  @ApiProperty({
    type: 'string',
  })
  userId: string;
  @ApiProperty({
    type: 'string',
  })
  friendId: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: () => UsersDto,
    required: false,
  })
  user?: UsersDto;
  @ApiProperty({
    type: () => UsersDto,
    required: false,
  })
  friend?: UsersDto;
}
