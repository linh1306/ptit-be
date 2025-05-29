import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class GroupChatUsersGroupChatIdUserIdUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  groupChatId: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;
}

@ApiExtraModels(GroupChatUsersGroupChatIdUserIdUniqueInputDto)
export class ConnectGroupChatUsersDto {
  @ApiProperty({
    type: GroupChatUsersGroupChatIdUserIdUniqueInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => GroupChatUsersGroupChatIdUserIdUniqueInputDto)
  groupChatId_userId: GroupChatUsersGroupChatIdUserIdUniqueInputDto;
}
