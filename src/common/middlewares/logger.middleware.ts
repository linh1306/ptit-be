import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ERR } from '../config/err.config';
import CONFIG from '../config/index.config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
    try {
      const authHeader = req.headers['authorization'];

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw ERR.TOKEN.NOT_FOUND;
      }

      const token = authHeader.split(' ')[1];
      const payload = this.jwtService.verify(token, {
        secret: CONFIG.token.accessSecret,
      });

      req.user = payload;
    } catch (err) {
      throw ERR.TOKEN.INVALID;
    }
    next();
  }
}
