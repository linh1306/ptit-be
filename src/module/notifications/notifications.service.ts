import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationDto } from '../../common/types/common/pagination.dto';
import { ResService } from '@types';
import { ERR } from '@app/common/config/err.config';
import { CustomCreateNotificationDto } from './dto/createNotification.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ usersId, ...body }: CustomCreateNotificationDto): ResService {
    const notification = await this.prisma.notifications.create({
      data: {
        ...body,
      },
    });
    await this.prisma.userNotifications.createMany({
      data: usersId.map((userId) => ({
        userId,
        notificationId: notification.id,
      })),
    });

    return { data: notification };
  }

  async getUserNotifications(userId: string, query: PaginationDto): ResService {
    const { page, pageSize } = query;

    const [userNotifications, total] = await Promise.all([
      this.prisma.userNotifications.findMany({
        where: {
          userId,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.userNotifications.count({
        where: {
          userId,
        },
      }),
    ]);

    return {
      data: userNotifications,
      metadata: { total, page, pageSize },
    };
  }

  async getNotifications(query: PaginationDto): ResService {
    const { page, pageSize } = query;
    const [notifications, total] = await Promise.all([
      this.prisma.notifications.findMany({
        where: {},
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.notifications.count({
        where: {},
      }),
    ]);

    return {
      data: notifications,
      metadata: { total, page, pageSize },
    };
  }

  async markAsRead(userId: string, id: string): ResService {
    try {
      const userNotification = await this.prisma.userNotifications.update({
        where: { id, userId },
        data: {
          isRead: true,
        },
      });

      return { data: userNotification };
    } catch (error) {
      throw ERR.DATA.COMMON.NOT_FOUND;
    }
  }

  async remove(userId: string, id: string): ResService {
    try {
      const userNotification = await this.prisma.userNotifications.delete({
        where: { id, userId },
      });
      return {
        data: userNotification,
      };
    } catch (error) {
      throw ERR.DATA.COMMON.NOT_FOUND;
    }
  }
}
