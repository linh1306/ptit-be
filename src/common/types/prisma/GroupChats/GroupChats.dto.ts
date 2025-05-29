import { GroupChatType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class GroupChatsDto {
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
}
