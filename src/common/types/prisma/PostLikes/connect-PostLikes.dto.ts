import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PostLikesPostIdUserIdUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  postId: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;
}

@ApiExtraModels(PostLikesPostIdUserIdUniqueInputDto)
export class ConnectPostLikesDto {
  @ApiProperty({
    type: PostLikesPostIdUserIdUniqueInputDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PostLikesPostIdUserIdUniqueInputDto)
  postId_userId: PostLikesPostIdUserIdUniqueInputDto;
}
