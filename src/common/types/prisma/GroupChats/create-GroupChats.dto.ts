import { GroupChatType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateGroupChatsDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({
    type: 'boolean',
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isGroup?: boolean;
  @ApiProperty({
    enum: GroupChatType,
    enumName: 'GroupChatType',
    default: 'group',
    required: false,
  })
  @IsOptional()
  @IsEnum(GroupChatType)
  type?: GroupChatType;
}
