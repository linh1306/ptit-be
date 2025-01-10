import { Module } from '@nestjs/common';
import { RedisModule as RedisM } from '@nestjs-modules/ioredis';
import { RedisService } from './redis.service'; // Import RedisService

@Module({
  imports: [
    RedisM.forRoot({
      type: 'single',
      url: 'redis://default:Rl38v7hDXP6umveNAJsdpDYPiUREycQs@redis-17732.c245.us-east-1-3.ec2.redns.redis-cloud.com:17732',
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
