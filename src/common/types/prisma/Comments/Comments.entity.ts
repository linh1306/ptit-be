import { UsersDto } from '../Users';
import { PostsDto } from '../Posts';
import { CommentsDto } from '../Comments';
import { ApiProperty } from '@nestjs/swagger';
export class CommentsEntity {
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
  })
  postId: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  commentId: string | null;
  @ApiProperty({
    type: 'string',
    isArray: true,
  })
  tags: string[];
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
    type: () => PostsDto,
    required: false,
  })
  post?: PostsDto;
  @ApiProperty({
    type: () => CommentsDto,
    required: false,
    nullable: true,
  })
  parentComment?: CommentsDto | null;
  @ApiProperty({
    type: () => CommentsDto,
    isArray: true,
    required: false,
  })
  childComments?: CommentsDto[];
}
