import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GroupChat } from '@prisma/client';
import { Request as ExpressRequest } from 'express';
import { CreateGroupChatDto } from '../common/type/groupChat.dto';
import { GroupChatService } from '../service/groupChat.service';
import { ChatService } from '../service/chat.service';
import { CreateMessageDto } from '../common/type/chat.dto';
import { PaginationDto } from '../common/type/index.type';

@Controller('group-chat')
export class GroupChatController {
  constructor(
    private readonly groupChat: GroupChatService,
    private readonly chat: ChatService,
  ) {}

  @Get('')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  getGroupChat(
    @Request() req: ExpressRequest,
    @Query() param: PaginationDto,
  ): Promise<GroupChat[]> {
    return this.groupChat.getGroupChats(req, param);
  }

  @Post('')
  createGroupChat(
    @Request() req: ExpressRequest,
    @Body() body: CreateGroupChatDto,
  ): Promise<GroupChat> {
    return this.groupChat.createGroupChat(req, body);
  }

  @Post(':groupChatId/messages')
  async createMessage(
    @Request() req: ExpressRequest,
    @Param('groupChatId') groupChatId: string,
    @Body() body: CreateMessageDto,
  ) {
    return this.chat.createMessage(req, groupChatId, body);
  }

  @Get(':groupChatId/messages')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async getMessages(
    @Request() req: ExpressRequest,
    @Param('groupChatId') groupChatId: string,
    @Query() param: PaginationDto,
  ) {
    return this.chat.getMessages(req, groupChatId, param);
  }
}
