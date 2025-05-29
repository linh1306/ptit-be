import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GroupChatsModule } from './module/group-chats/group-chats.module';
import { PostsModule } from './module/posts/posts.module';
import { CommentsModule } from './module/comments/comments.module';
import { FriendsModule } from './module/friends/friends.module';
import { AuthModule } from './module/auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { SubjectsModule } from './module/subjects/subjects.module';
import { LessonsModule } from './module/lessons/lessons.module';
import { NotificationsModule } from './module/notifications/notifications.module';
import { JwtAuthModule } from './jwt/jwt.module';
import { MessagesModule } from './module/messages/messages.module';
import { APP_GUARD } from '@nestjs/core';
import { UserInjectGuard } from './common/guards/userInject.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { SocketModule } from './module/socket/socket.module';

@Module({
  imports: [
    // Configuration
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   load: [config],
    // }),

    // Database
    PrismaModule,
    // JWT
    JwtAuthModule,

    SocketModule,

    // Feature modules
    AuthModule,
    UsersModule,
    SubjectsModule,
    LessonsModule,
    GroupChatsModule,
    MessagesModule,
    PostsModule,
    CommentsModule,
    NotificationsModule,
    FriendsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: UserInjectGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // Chạy sau
    },
  ],
})
export class AppModule {}
