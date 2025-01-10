import { User } from '@prisma/client';
import { RedisService } from '@app/redis';
import { CommonService } from '@app/common';
import { ReqConfig } from '../common/type/index.type';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../libs/prisma/src/prisma.service';
import {
  IResSignIn,
  IResSignOut,
  IResSignUp,
  SignInDto,
  SignUpDto,
} from '../common/type/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fuc: CommonService,
    private readonly redis: RedisService,
  ) {}

  async getMe(req: ReqConfig): Promise<User> {
    return req.user;
  }

  async signIn(body: SignInDto): Promise<IResSignIn> {
    const password = this.fuc.createHashPassword(body.password);
    const user = await this.prisma.user.findUnique({
      where: { email: body.email, password },
    });

    if (user) {
      const token = await this.redis.createToken(user);

      return {
        token,
      };
    }
    throw new HttpException(
      'Người dùng không tồn tại',
      HttpStatus.UNAUTHORIZED,
    );
  }

  async signUp(body: SignUpDto): Promise<IResSignUp> {
    const password = this.fuc.createHashPassword(body.password);

    const user = await this.prisma.user.create({
      data: { ...body, password },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'Tạo tài khoản thất bại',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async signOut(req: ReqConfig): Promise<IResSignOut> {
    const authHeader = req.headers['authorization'];
    const token = Array.isArray(authHeader) ? authHeader[0] : authHeader;
    await this.redis.removeToken(token);
    return { message: 'success' };
  }
}
