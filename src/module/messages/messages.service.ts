import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../../common/types/common/pagination.dto';
import { PrismaService } from '@app/prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async find(userId: string, groupChatId: string, query: PaginationDto) {
    const { page, pageSize } = query;
    const skip = (page - 1) * pageSize;

    // Lấy tin nhắn từ các nhóm chat mà người dùng tham gia
    const messages = await this.prisma.messages.findMany({
      where: {
        groupChat: {
          groupChatUsers: {
            some: {
              userId,
            },
          },
        },
        groupChatId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            urlAvatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: pageSize,
    });

    return {
      data: messages,
    };
  }
}
