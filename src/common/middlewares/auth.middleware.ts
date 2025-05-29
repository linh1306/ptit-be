import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ERR } from '../config/err.config';
import CONFIG from '../config/index.config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    console.log(req.method);
    console.log('CORS header:', res.getHeader('Access-Control-Allow-Origin'));

    if (req.method === 'OPTIONS') return next();
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
