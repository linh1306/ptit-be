import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AuthMiddleware, SocketConfig } from './auth.middleware';
import { RedisService } from '@app/redis';
import { PrismaService } from '@app/prisma';

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(
    private authMiddleware: AuthMiddleware,
    private readonly redisService: RedisService,
    private readonly prisma: PrismaService,
  ) {
    this.authMiddleware = new AuthMiddleware(this.redisService, this.prisma);
  }

  afterInit(server: Server) {
    server.use(this.authMiddleware.use.bind(this.authMiddleware));
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(
    @ConnectedSocket() socket: SocketConfig,
    @MessageBody()
    data: {
      mes: string;
      group: string;
    },
  ): Promise<void> {
    if (!socket.rooms.has(data.group)) {
      console.log(`Socket not in room ${data.group}`);
      return;
    }
    this.server
      .to(data.group)
      .emit('receiveMessage', { ...data, user: socket.data.user });
  }
}
