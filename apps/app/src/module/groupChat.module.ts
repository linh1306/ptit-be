import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../../libs/prisma/src/prisma.module';
import { GroupChatController } from '../controller/groupChat.controller';
import { GroupChatService } from '../service/groupChat.service';
import { ChatService } from '../service/chat.service';

@Module({
  imports: [PrismaModule],
  controllers: [GroupChatController],
  providers: [GroupChatService, ChatService],
})
export class GroupChatModule {}
