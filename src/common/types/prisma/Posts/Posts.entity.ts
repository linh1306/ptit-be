import { UsersDto } from '../Users';
import { CommentsDto } from '../Comments';
import { PostLikesDto } from '../PostLikes';
import { ApiProperty } from '@nestjs/swagger';
export class PostsEntity {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  content: string;
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
    type: () => UsersDto,
    required: false,
  })
  user?: UsersDto;
  @ApiProperty({
    type: () => CommentsDto,
    isArray: true,
    required: false,
  })
  comments?: CommentsDto[];
  @ApiProperty({
    type: () => PostLikesDto,
    isArray: true,
    required: false,
  })
  postLikes?: PostLikesDto[];
}
