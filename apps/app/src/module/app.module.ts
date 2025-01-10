import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaModule } from '../../../../libs/prisma/src/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { GroupChatModule } from './groupChat.module';
import { RedisModule, RedisService } from '@app/redis';
import { AuthMiddleware } from '../common/middware/auth.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '../common/interceptor/res.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule,
    MongooseModule,
    AuthModule,
    GroupChatModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [
    RedisService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/auth/signIn', method: RequestMethod.ALL },
        { path: '/auth/signUp', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}
