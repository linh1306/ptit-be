import { UsersDto } from '../Users';
import { GroupChatsDto } from '../GroupChats';
import { ApiProperty } from '@nestjs/swagger';
export class MessagesEntity {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  userId: string;
  @ApiProperty({
    type: 'string',
  })
  groupChatId: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  content: string | null;
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
    type: () => GroupChatsDto,
    required: false,
  })
  groupChat?: GroupChatsDto;
  @ApiProperty({
    type: () => GroupChatsDto,
    required: false,
    nullable: true,
  })
  lastMessageOf?: GroupChatsDto | null;
}
