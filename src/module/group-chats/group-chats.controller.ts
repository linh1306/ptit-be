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
import { GroupChatsService } from './group-chats.service';
import { PaginationDto } from '../../common/types/common/pagination.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  GroupChatsEntity,
  GroupChatUsersEntity,
  PayloadJwtDto,
  ResMessage,
  UpdateGroupChatsDto,
} from '@types';
import { User } from '@app/common/decorators/user.decorator';
import { CustomCreateGroupChatDto } from './dto/createGroupChat.dto';
import { AddUserDto } from './dto/addUser.dto';
import { ApiSwagger } from '@app/common/decorators/apiSwagger.decorator';
import { JwtAuthGuard } from '@app/common/guards/jwt.guard';

@ApiTags('group-chats')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('group-chats')
export class GroupChatsController {
  constructor(private readonly groupChatsService: GroupChatsService) {}

  @Post()
  @ApiSwagger({
    summary: 'Tạo group chat mới',
    response: {
      type: GroupChatsEntity,
    },
  })
  create(
    @User() { id }: PayloadJwtDto,
    @Body() body: CustomCreateGroupChatDto,
  ) {
    return this.groupChatsService.create(id, body);
  }

  @Get()
  @ApiSwagger({
    summary: 'Lấy danh sách group chat của user',
    response: {
      type: GroupChatUsersEntity,
      isArray: true,
    },
  })
  getGroupChats(@User('id') userId: string, @Query() query: PaginationDto) {
    return this.groupChatsService.getGroupChats(userId, query);
  }

  @Get(':id/users')
  @ApiSwagger({
    summary: 'Lấy danh sách người dùng trong nhóm chat',
    param: ['id'],
    response: {
      type: GroupChatUsersEntity,
      isArray: true,
    },
  })
  getUsers(
    @User('id') userId: string,
    @Param('id') groupChatId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.groupChatsService.getUsers(userId, groupChatId, paginationDto);
  }

  @Get(':id')
  @ApiSwagger({
    summary: 'Lấy group chat theo id',
    param: ['id'],
    response: {
      type: GroupChatsEntity,
    },
  })
  getGroupChat(@User('id') userId: string, @Param('id') id: string) {
    return this.groupChatsService.getGroupChat(userId, id);
  }

  @Patch(':id')
  @ApiSwagger({
    summary: 'Cập nhật group chat',
    param: ['id'],
    response: {
      type: GroupChatsEntity,
    },
  })
  update(
    @User('id') userId: string,
    @Param('id') id: string,
    @Body() updateGroupChatDto: UpdateGroupChatsDto,
  ) {
    return this.groupChatsService.update(userId, id, updateGroupChatDto);
  }

  @Delete(':id')
  @ApiSwagger({
    summary: 'Xóa group chat',
    param: ['id'],
    response: {
      type: ResMessage,
    },
  })
  remove(@User('id') userId: string, @Param('id') id: string) {
    return this.groupChatsService.remove(userId, id);
  }

  @Post(':id/users')
  @ApiSwagger({
    summary: 'Thêm người dùng vào nhóm chat',
    param: ['id'],
    response: {
      type: GroupChatUsersEntity,
    },
  })
  addMember(
    @User('id') userId: string,
    @Param('id') id: string,
    @Body() body: AddUserDto,
  ) {
    return this.groupChatsService.addMember(id, userId, body);
  }

  @Delete(':id/users/:deleteUserId')
  @ApiSwagger({
    summary: 'Xóa người dùng khỏi nhóm chat',
    param: ['id', 'deleteUserId'],
    response: {
      type: ResMessage,
    },
  })
  removeMember(
    @User('id') userId: string,
    @Param('id') id: string,
    @Param('deleteUserId') deleteUserId: string,
  ) {
    return this.groupChatsService.removeMember(id, userId, deleteUserId);
  }
}
