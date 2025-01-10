import { RedisService, TPayloadToken } from '@app/redis';
import { Socket } from 'socket.io';
import { PrismaService } from '@app/prisma';

export interface SocketConfig extends Socket {
  data: {
    user: TPayloadToken;
  };
}

export class AuthMiddleware {
  constructor(
    private readonly redis: RedisService,
    private readonly prisma: PrismaService,
  ) {}

  async use(socket: SocketConfig, next: (err?: any) => void) {
    const authHeader =
      socket.handshake.headers['authorization'] || socket.handshake.auth.token;
    const token = Array.isArray(authHeader) ? authHeader[0] : authHeader;

    if (!token) {
      return next(new Error('Không tìm thấy token'));
    }

    try {
      const dataUser = await this.redis.authenticateToken(token);
      if (!dataUser) {
        return next(new Error('Token không hợp lệ hoặc hết hạn'));
      }

      socket.data.user = dataUser;
      const user = await this.prisma.user.findUnique({
        where: { id: dataUser.id },
      });

      if (user.groupChatIds) {
        socket.join(user.groupChatIds);
      }

      next();
    } catch (error) {
      return next(new Error('Lỗi khi xác thực token'));
    }
  }
}
