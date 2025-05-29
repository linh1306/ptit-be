import { PostsDto } from '../Posts';
import { UsersDto } from '../Users';
import { ApiProperty } from '@nestjs/swagger';
export class PostLikesEntity {
  @ApiProperty({
    type: 'string',
  })
  postId: string;
  @ApiProperty({
    type: 'string',
  })
  userId: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: () => PostsDto,
    required: false,
  })
  post?: PostsDto;
  @ApiProperty({
    type: () => UsersDto,
    required: false,
  })
  user?: UsersDto;
}
