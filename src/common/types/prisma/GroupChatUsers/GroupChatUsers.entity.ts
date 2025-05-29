import { GroupChatsDto } from '../GroupChats';
import { UsersDto } from '../Users';
import { ApiProperty } from '@nestjs/swagger';
export class GroupChatUsersEntity {
  @ApiProperty({
    type: 'string',
  })
  groupChatId: string;
  @ApiProperty({
    type: 'string',
  })
  userId: string;
  @ApiProperty({
    type: () => GroupChatsDto,
    required: false,
  })
  groupChat?: GroupChatsDto;
  @ApiProperty({
    type: () => UsersDto,
    required: false,
  })
  user?: UsersDto;
}
