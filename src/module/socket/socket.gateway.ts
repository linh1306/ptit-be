import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import CONFIG from '@app/common/config/index.config';
import { Messages } from '@prisma/client';
import { PrismaService } from '@app/prisma/prisma.service';
import { PayloadJwtDto } from '@types';

interface IMesSocket extends Pick<Messages, 'content' | 'groupChatId'> {}

export interface SocketConfig extends Socket {
  data: {
    user: PayloadJwtDto;
  };
}

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  },
})
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async handleConnection(client: Socket) {
    const author =
      client.handshake.auth?.token || client.handshake.headers?.authorization;

    if (!author) {
      console.log('hủy kết nối');
      client.disconnect();
      return;
    }
    const token = author.split(' ')[1];
    console.log('token:', token);

    try {
      const payload = this.jwtService.verify(token, {
        secret: CONFIG.token.accessSecret,
      });
      client.data.user = payload;

      const user = await this.prisma.users.findUnique({
        where: { id: payload.id },
        include: {
          groupChats: {
            select: {
              id: true,
            },
          },
        },
      });

      const groupChatIds =
        user?.groupChats.map((groupChat) => groupChat.id) || [];
      client.join(groupChatIds);
      console.log('✅ Client connected');
    } catch (err) {
      console.log('hủy kết nối', err);
      client.disconnect();
    }
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @ConnectedSocket() socket: SocketConfig,
    @MessageBody()
    data: IMesSocket,
  ): Promise<void> {
    console.log('mess', data);

    if (!socket.rooms.has(data.groupChatId)) {
      return;
    }
    const message = await this.prisma.messages.create({
      data: {
        content: data.content,
        groupChatId: data.groupChatId,
        userId: socket.data.user.id,
      },
    });
    if (!message) {
      return;
    }
    this.server.to(data.groupChatId).emit('receiveMessage', message);
  }
}
