import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../../libs/prisma/src/prisma.module';
import { CommonService } from '@app/common';
import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../service/auth.service';
import { RedisService } from '@app/redis';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService, RedisService, CommonService],
})
export class AuthModule {}
