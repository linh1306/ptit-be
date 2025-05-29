import { UsersDto } from '../Users';
import { MessagesDto } from '../Messages';
import { GroupChatUsersDto } from '../GroupChatUsers';
import { GroupChatType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class GroupChatsEntity {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  name: string;
  @ApiProperty({
    type: 'boolean',
  })
  isGroup: boolean;
  @ApiProperty({
    enum: GroupChatType,
    enumName: 'GroupChatType',
  })
  type: GroupChatType;
  @ApiProperty({
    type: 'string',
  })
  adminId: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  lastMessageId: string | null;
  @ApiProperty({
    type: () => UsersDto,
    required: false,
  })
  admin?: UsersDto;
  @ApiProperty({
    type: () => MessagesDto,
    required: false,
    nullable: true,
  })
  lastMessage?: MessagesDto | null;
  @ApiProperty({
    type: () => MessagesDto,
    isArray: true,
    required: false,
  })
  messages?: MessagesDto[];
  @ApiProperty({
    type: () => GroupChatUsersDto,
    isArray: true,
    required: false,
  })
  groupChatUsers?: GroupChatUsersDto[];
}
