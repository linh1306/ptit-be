import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { PaginationDto, ReqConfig } from '../common/type/index.type';
import { UserNotification } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}
  async getNotifications(
    req: ReqConfig,
    param: PaginationDto,
  ): Promise<UserNotification[]> {
    const userId = req.user.id;
    return this.prisma.userNotification.findMany({
      where: { userId },
      take: param.pageSize,
      skip: (param.page - 1) * param.pageSize,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
