import { Injectable } from '@nestjs/common';
import { GroupChat } from '@prisma/client';
import { PrismaService } from '../../../../libs/prisma/src/prisma.service';
import { CreateGroupChatDto } from '../common/type/groupChat.dto';
import { PaginationDto, ReqConfig } from '../common/type/index.type';

@Injectable()
export class GroupChatService {
  constructor(private readonly prisma: PrismaService) {}

  async createGroupChat(
    req: ReqConfig,
    body: CreateGroupChatDto,
  ): Promise<GroupChat> {
    const { name, userId, typeGroup } = body;
    const isGroup = userId ? true : false;
    const type = userId ? typeGroup : undefined;

    return await this.prisma.groupChat.create({
      data: {
        name,
        isGroup,
        type,
        admin: {
          connect: { id: req.user.id },
        },
        users: {
          connect: { id: req.user.id },
        },
      },
    });
  }

  async getGroupChats(
    req: ReqConfig,
    pagination: PaginationDto,
  ): Promise<GroupChat[]> {
    return await this.prisma.groupChat.findMany({
      where: {
        userIds: {
          has: req.user.id,
        },
      },
      take: pagination.pageSize,
      skip: (pagination.page - 1) * pagination.pageSize,
      orderBy: {
        lastMessageTime: 'desc',
      },
    });
  }
}
