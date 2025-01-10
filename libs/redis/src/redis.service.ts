import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { ROLE, User } from '@prisma/client';
import Redis from 'ioredis';
import { uuid } from 'uuidv4';

export type TPayloadToken = Pick<
  User,
  'name' | 'id' | 'code' | 'email' | 'role' | 'course'
>;

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async createToken(user: User): Promise<string> {
    const token = user.id + '-' + uuid();
    const keyTokenRedis = 'token:' + token;
    const payload: TPayloadToken = {
      id: user.id,
      name: user.name,
      code: user.code,
      email: user.email,
      course: user.course,
      role: user.role,
    };
    await this.redis.hset(keyTokenRedis, payload);
    return token;
  }

  async authenticateToken(token: string): Promise<TPayloadToken | null> {
    const exists = await this.redis.exists('token:' + token);
    if (!exists) {
      return null;
    }
    const { name, id, code, email, course, role } = await this.redis.hgetall(
      'token:' + token,
    );

    const roleUser: ROLE = ROLE[role as keyof typeof ROLE];
    const dataToken: TPayloadToken = {
      id,
      name,
      code,
      email,
      course,
      role: roleUser,
    };
    return dataToken;
  }

  async removeToken(token: string): Promise<void> {
    const keyTokenRedis = 'token:' + token;
    await this.redis.del(keyTokenRedis);
  }
}
