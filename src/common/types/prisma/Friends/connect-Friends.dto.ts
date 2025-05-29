import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class FriendsUserIdFriendIdUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  friendId: string;
}

@ApiExtraModels(FriendsUserIdFriendIdUniqueInputDto)
export class ConnectFriendsDto {
  @ApiProperty({
    type: FriendsUserIdFriendIdUniqueInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => FriendsUserIdFriendIdUniqueInputDto)
  userId_friendId: FriendsUserIdFriendIdUniqueInputDto;
}
