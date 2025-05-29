import CONFIG from '@app/common/config/index.config';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: []
        // CONFIG.environment === 'development'
        //   ? ['query', 'info', 'warn', 'error']
        //   : ['error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    if (CONFIG.environment !== 'test') return;

    // Delete in correct order to respect foreign key constraints
    const models = [
      'userNotification',
      'notification',
      'postLike',
      'comment',
      'post',
      'message',
      'groupChatUser',
      'groupChat',
      'friend',
      'friendRequest',
      'lessonMultipleChoice',
      'lessonDocument',
      'lesson',
      'subject',
      'reportUserRequest',
      'reportRequest',
      'user',
    ];

    return Promise.all(models.map((model) => this[model].deleteMany()));
  }
}
