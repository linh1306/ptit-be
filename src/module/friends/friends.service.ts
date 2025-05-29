import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateFriendRequestsDto,
  FriendRequestsDto,
  FriendsDto,
  ResMessage,
  ResService,
  PaginationDto,
} from '@types';
import { ERR } from '@app/common/config/err.config';
import { SearchFriendDto } from './dto/getFriend.dto';
import { generateDeterministicUUID } from '@app/common/utils/id';

@Injectable()
export class FriendsService {
  constructor(private readonly prisma: PrismaService) {}

  async createRequest(
    senderId: string,
    body: CreateFriendRequestsDto,
  ): ResService {
    console.log('senderId', senderId, 'body', body);
    
    const id = generateDeterministicUUID(senderId, body.receiverId);

    console.log('id', id);

    const friendRequest = await this.prisma.friendRequests.create({
      data: {
        id,
        ...body,
        senderId,
      },
    });

    return { data: friendRequest };
  }

  async getSentRequests(userId: string, query: PaginationDto): ResService {
    const { page, pageSize } = query;

    const [requests, total] = await Promise.all([
      this.prisma.friendRequests.findMany({
        where: { senderId: userId },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          receiver: {
            select: {
              id: true,
              name: true,
              code: true,
              urlAvatar: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.friendRequests.count({
        where: { senderId: userId },
      }),
    ]);

    return {
      data: requests,
      metadata: {
        total,
        page,
        pageSize,
      },
    };
  }

  async getReceivedRequests(userId: string, query: PaginationDto): ResService {
    const { page, pageSize } = query;

    const [requests, total] = await Promise.all([
      this.prisma.friendRequests.findMany({
        where: { receiverId: userId },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              code: true,
              urlAvatar: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.friendRequests.count({
        where: { receiverId: userId },
      }),
    ]);

    return {
      data: requests,
      metadata: {
        total,
        page,
        pageSize,
      },
    };
  }

  async confirmFriendRequest(userId: string, requestId: string): ResService {
    try {
      const { senderId } = await this.prisma.friendRequests.delete({
        where: { id: requestId, receiverId: userId },
      });
      await this.prisma.friends.create({
        data: {
          userId: senderId,
          friendId: userId,
        },
      });
    } catch (error) {
      throw ERR.DATA.LESSON.NOT_FOUND;
    }

    return {
      data: {
        message: 'Đồng ý kết bạn thành công',
      },
    };
  }

  async getFriends(userId: string, query: SearchFriendDto): ResService {
    const { search, page, pageSize } = query;
    const friends = await this.prisma.users.findMany({
      where: {
        OR: [
          {
            friendsAsFriend: {
              some: { userId: userId },
            },
          },
          {
            friendsAsUser: {
              some: { friendId: userId },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        code: true,
        urlAvatar: true,
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: { name: 'asc' },
    });

    return {
      data: friends,
    };
  }
  async getNonFriendUsers(userId: string, query: SearchFriendDto): ResService {
    const { search, page, pageSize } = query;
    const friends = await this.prisma.users.findMany({
      where: {
        id: {
          not: userId,
        },
        AND: [
          {
            friendsAsFriend: {
              none: {
                userId: userId,
              },
            },
          },
          {
            friendsAsUser: {
              none: {
                friendId: userId,
              },
            },
          },
          {
            friendRequestsSent: {
              none: {
                receiverId: userId,
              },
            },
          },
          {
            friendRequestsReceived: {
              none: {
                senderId: userId,
              },
            },
          },
        ],
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        code: true,
        urlAvatar: true,
      },
    });

    return {
      data: friends,
    };
  }

  async removeFriend(userId: string, friendId: string): ResService {
    const { count } = await this.prisma.friends.deleteMany({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
      },
    });

    if (count === 0) {
      throw ERR.DATA.LESSON.NOT_FOUND;
    }

    return {
      data: {
        message: 'Xóa bạn thành công',
      },
    };
  }

  async cancelFriendRequest(userId: string, requestId: string): ResService {
    const { count } = await this.prisma.friendRequests.deleteMany({
      where: {
        OR: [
          { id: requestId, senderId: userId },
          { id: requestId, receiverId: userId },
        ],
      },
    });

    if (count === 0) throw ERR.DATA.LESSON.NOT_FOUND;

    return {
      data: {
        message: 'Hủy kết bạn thành công',
      },
    };
  }
}
