import { CreateGroupChatsDto } from '@app/common/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CustomCreateGroupChatDto extends CreateGroupChatsDto {
  @ApiProperty({
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  memberIds: string[];
}
