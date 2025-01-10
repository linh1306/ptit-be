import { Message } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../libs/prisma/src/prisma.service';
import { CreateMessageDto } from '../common/type/chat.dto';
import { PaginationDto, ReqConfig } from '../common/type/index.type';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}
  async createMessage(
    req: ReqConfig,
    groupChatId: string,
    body: CreateMessageDto,
  ): Promise<Message> {
    return await this.prisma.message.create({
      data: {
        senderId: req.user.id,
        groupChatId,
        content: body.content,
      },
    });
  }

  async getMessages(
    req: ReqConfig,
    groupChatId: string,
    pagination: PaginationDto,
  ): Promise<Message[]> {
    const userId = req.user.id;
    const groups = await this.prisma.groupChat.findFirst({
      where: {
        id: groupChatId,
        userIds: {
          has: userId,
        },
      },
    });

    if (!groups) {
      return [];
    }

    return await this.prisma.message.findMany({
      where: {
        groupChatId,
      },
      take: pagination.pageSize,
      skip: (pagination.page - 1) * pagination.pageSize,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
