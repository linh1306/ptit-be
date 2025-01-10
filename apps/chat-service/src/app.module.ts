import { Module } from '@nestjs/common';
import { EventsGateway } from './event.gateway';
import { RedisModule } from '@app/redis';
import { PrismaModule } from '@app/prisma';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [RedisModule, PrismaModule],
  providers: [EventsGateway, AuthMiddleware],
})
export class AppModule {}
