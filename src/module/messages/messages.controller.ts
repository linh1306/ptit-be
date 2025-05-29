import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { PaginationDto } from '../../common/types/common/pagination.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { MessagesEntity } from '@types';
import { User } from '@app/common/decorators/user.decorator';
import { ApiSwagger } from '@app/common/decorators/apiSwagger.decorator';
import { JwtAuthGuard } from '@app/common/guards/jwt.guard';

@ApiTags('messages')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('group-chat/:groupId')
  @ApiSwagger({
    summary: 'Lấy danh sách tin nhắn',
    param: ['groupId'],
    response: {
      type: MessagesEntity,
      isArray: true,
    },
  })
  find(
    @User('id') userId: string,
    @Param('groupId') groupId: string,
    @Query() query: PaginationDto,
  ) {
    return this.messagesService.find(userId, groupId, query);
  }
}
