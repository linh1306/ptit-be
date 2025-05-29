import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationDto } from '../../common/types/common/pagination.dto';
import {
  GroupChatsDto,
  GroupChatUsersDto,
  ResMessage,
  ResService,
  UpdateGroupChatsDto,
} from '@types';
import { CustomCreateGroupChatDto } from './dto/createGroupChat.dto';
import { ERR } from '@app/common/config/err.config';
import { AddUserDto } from './dto/addUser.dto';

@Injectable()
export class GroupChatsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    { memberIds, ...body }: CustomCreateGroupChatDto,
  ): ResService {
    const groupChat = await this.prisma.$transaction(async (tx) => {
      const newGroupChat = await tx.groupChats.create({
        data: {
          ...body,
          lastMessageId: null,
          adminId: userId,
        },
      });

      if (memberIds?.length) {
        await tx.groupChatUsers.createMany({
          data: memberIds.map((userId) => ({
            groupChatId: newGroupChat.id,
            userId,
          })),
          skipDuplicates: true,
        });
      }

      return newGroupChat;
    });

    return { data: groupChat };
  }

  async getGroupChats(userId: string, query: PaginationDto): ResService {
    const { page, pageSize } = query;

    const [groupChats, total] = await Promise.all([
      this.prisma.groupChatUsers.findMany({
        where: {
          userId,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          groupChat: {
            // select: {
            //   id: true,
            //   name: true,
            //   type: true,
            //   isGroup: true,
            //   adminId: true,
            // },
            include: {
              lastMessage: true,
            },
          },
        },
      }),
      this.prisma.groupChatUsers.count({
        where: {
          userId,
        },
      }),
    ]);

    return {
      data: groupChats,
      metadata: {
        total,
        page,
        pageSize,
      },
    };
  }

  async getUsers(
    userId: string,
    groupChatId: string,
    query: PaginationDto,
  ): ResService {
    const { page, pageSize } = query;

    const [groupChats, total] = await Promise.all([
      this.prisma.groupChatUsers.findMany({
        where: {
          groupChatId,
          userId,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              code: true,
              urlAvatar: true,
            },
          },
        },
      }),
      this.prisma.groupChatUsers.count({
        where: {
          groupChatId,
          userId,
        },
      }),
    ]);

    return {
      data: groupChats,
      metadata: {
        total,
        page,
        pageSize,
      },
    };
  }

  async getGroupChat(userId: string, id: string): ResService {
    const groupChat = await this.prisma.groupChats.findUnique({
      where: {
        id,
        groupChatUsers: {
          some: {
            userId,
          },
        },
      },
      include: {
        admin: {
          select: {
            id: true,
            name: true,
            code: true,
            urlAvatar: true,
          },
        },
        lastMessage: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return { data: groupChat };
  }

  async update(
    userId: string,
    id: string,
    body: UpdateGroupChatsDto,
  ): ResService {
    try {
      const group = await this.prisma.groupChats.update({
        where: { id, adminId: userId },
        data: {
          ...body,
        },
      });

      return { data: group };
    } catch (error) {
      throw ERR.DATA.COMMON.NOT_FOUND;
    }
  }

  async remove(userId: string, id: string): ResService {
    try {
      this.prisma.groupChats.delete({
        where: { id, adminId: userId },
      });
    } catch (error) {
      throw ERR.DATA.COMMON.NOT_FOUND;
    }

    return {
      data: {
        message: 'Xóa thành công',
      },
    };
  }

  async addMember(
    groupChatId: string,
    userId: string,
    body: AddUserDto,
  ): ResService {
    const { usersId } = body;

    const groupChat = await this.prisma.groupChats.findUnique({
      where: { id: groupChatId },
    });
    if (!groupChat) throw ERR.DATA.GROUP_CHAT.NOT_FOUND;

    if (groupChat.adminId !== userId) throw ERR.DATA.COMMON.NOT_ALLOWED;

    const { count } = await this.prisma.groupChatUsers.createMany({
      data: usersId.map((userId) => ({
        groupChatId,
        userId,
        groupChat: {
          connect: { id: groupChatId },
        },
        user: {
          connect: { id: userId },
        },
      })),
      skipDuplicates: true,
    });

    return {
      data: {
        message: `Thêm thành công ${count} người dùng`,
      },
    };
  }

  async removeMember(
    groupChatId: string,
    userId: string,
    deleteUserId: string,
  ): ResService {
    const { count } = await this.prisma.groupChatUsers.deleteMany({
      where: {
        groupChatId,
        userId: deleteUserId,
        groupChat: {
          adminId: userId,
        },
      },
    });

    if (count === 0) throw ERR.DATA.COMMON.NOT_FOUND;

    return {
      data: {
        message: 'Xóa thành công',
      },
    };
  }
}
