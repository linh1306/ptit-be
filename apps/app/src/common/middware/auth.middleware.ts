import { RedisService } from '@app/redis';
import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { ReqConfig } from '../type/index.type';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly redis: RedisService) {}

  async use(req: ReqConfig, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = Array.isArray(authHeader) ? authHeader[0] : authHeader;

    if (!token) {
      throw new HttpException('Không tìm thấy token', HttpStatus.UNAUTHORIZED);
    }

    const dataUser = await this.redis.authenticateToken(token);

    if (!dataUser) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    req.user = dataUser;

    next();
  }
}
