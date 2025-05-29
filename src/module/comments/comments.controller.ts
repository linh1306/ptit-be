import { JwtAuthGuard } from '@app/common/guards/jwt.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { PaginationDto } from '../../common/types/common/pagination.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ResMessage } from '@app/common/types/common/resMessage.dto';
import { User } from '@app/common/decorators/user.decorator';
import { PayloadJwtDto } from '@app/common/types/common/payload-jwt.dto';
import { CommentsDto, CommentsEntity, CreateCommentsDto } from '@types';
import { ApiSwagger } from '@app/common/decorators/apiSwagger.decorator';

@ApiTags('comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly comments: CommentsService) {}

  @Post('post/:postId')
  @ApiSwagger({
    summary: 'Tạo bình luận mới',
    param: ['postId'],
    response: {
      type: CommentsEntity,
    },
  })
  create(
    @User() { id }: PayloadJwtDto,
    @Param('postId') postId: string,
    @Body() body: CreateCommentsDto,
  ) {
    return this.comments.create(id, postId, body);
  }

  @Get('post/:postId')
  @ApiOperation({ summary: 'Lấy bình luận theo ID bài viết' })
  @ApiParam({ name: 'postId', required: true })
  @ApiResponse({
    type: PaginationDto,
  })
  @ApiSwagger({
    summary: 'Lấy bình luận theo ID bài viết',
    param: ['postId'],
    response: {
      type: CommentsEntity,
      isArray: true,
    },
  })
  findByPost(
    @Param('postId') postId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.comments.findByPost(postId, paginationDto);
  }

  @Delete(':id')
  @ApiSwagger({
    summary: 'Xóa bình luận',
    param: ['id'],
    response: {
      type: ResMessage,
    },
  })
  remove(@User() user: PayloadJwtDto, @Param('id') id: string) {
    return this.comments.remove(user, id);
  }
}
