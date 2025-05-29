import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PaginationDto } from '../../common/types/common/pagination.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  CreatePostsDto,
  PayloadJwtDto,
  UpdatePostsDto,
  PostsEntity,
  ResMessage,
  PostLikesEntity,
} from '@types';
import { User } from '@app/common/decorators/user.decorator';
import { ApiSwagger } from '@app/common/decorators/apiSwagger.decorator';
import { JwtAuthGuard } from '@app/common/guards/jwt.guard';

@ApiTags('posts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiSwagger({
    summary: 'Tạo bài viết mới',
    response: {
      type: PostsEntity,
    },
  })
  create(@User() { id }: PayloadJwtDto, @Body() body: CreatePostsDto) {
    return this.postsService.create(id, body);
  }

  @Get()
  @ApiSwagger({
    summary: 'Lấy tất cả bài viết với phân trang',
    query: PaginationDto,
    response: {
      type: PostsEntity,
      isArray: true,
    },
  })
  getPosts(@User('id') userId: string, @Query() query: PaginationDto) {
    return this.postsService.getPosts(userId, query);
  }

  @Get(':id')
  @ApiSwagger({
    summary: 'Lấy bài viết theo id',
    param: ['id'],
    response: {
      type: PostsEntity,
    },
  })
  getPost(@Param('id') id: string) {
    return this.postsService.getPost(id);
  }

  @Patch(':id')
  @ApiSwagger({
    summary: 'Cập nhật bài viết',
    param: ['id'],
    response: {
      type: PostsEntity,
    },
  })
  update(
    @User('id') userId: string,
    @Param('id') id: string,
    @Body() body: UpdatePostsDto,
  ) {
    return this.postsService.update(userId, id, body);
  }

  @Delete(':id')
  @ApiSwagger({
    summary: 'Xóa bài viết',
    param: ['id'],
    response: {
      type: ResMessage,
    },
  })
  remove(@User('id') userId: string, @Param('id') id: string) {
    return this.postsService.remove(userId, id);
  }

  @Post(':id/like')
  @ApiSwagger({
    summary: 'Thích bài viết',
    param: ['id'],
    response: {
      type: PostLikesEntity,
    },
  })
  likePost(@User('id') userId: string, @Param('id') postId: string) {
    return this.postsService.likePost(userId, postId);
  }

  @Delete(':id/like')
  @ApiSwagger({
    summary: 'Bỏ thích bài viết',
    param: ['id'],
    response: {
      type: PostLikesEntity,
    },
  })
  unlikePost(@User('id') userId: string, @Param('id') postId: string) {
    return this.postsService.unlikePost(userId, postId);
  }
}
