import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BodySignInDto } from './dto/signIn.dto';
import { PrismaService } from '@app/prisma/prisma.service';
import { PayloadJwtDto } from '@app/common/types/common/payload-jwt.dto';
import { BodyRefreshTokenDto } from './dto/refresh-token.dto';
import { ResService } from '@app/common/types/common/res.type';
import { BodySignUpDto } from './dto/signUp.dto';
import * as argon2 from 'argon2';
import { ERR } from '@app/common/config/err.config';
import { BodyResetPasswordDto } from './dto/reset-password.dto';
import CONFIG from '@app/common/config/index.config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn(body: BodySignInDto): ResService {
    const { password, ...q } = body;
    const user = await this.prisma.users.findFirst({
      where: { ...q },
    });

    if (!user) throw ERR.AUTH.INVALID_CREDENTIALS;

    const isPasswordValid = await this.comparePassword(
      password,
      user.password || '',
    );
    if (!isPasswordValid) throw ERR.AUTH.INVALID_CREDENTIALS;

    const payload = new PayloadJwtDto(user).toPlain();
    const { accessToken, refreshToken } = await this.generateTokens(payload);

    return {
      data: {
        accessToken,
        refreshToken,
      },
    };
  }

  async signUp(body: BodySignUpDto): ResService {
    const password = await this.hashPassword(body.password);
    const user = await this.prisma.users.create({
      data: { ...body, password },
    });

    return {
      data: user,
    };
  }

  async refreshToken(body: BodyRefreshTokenDto): ResService {
    const { refreshToken } = body;
    const payloadRefreshToken = this.verifyToken({ refreshToken });
    if (!payloadRefreshToken) {
      throw ERR.TOKEN.INVALID;
    }
    const { exp, iat, ...query } = payloadRefreshToken;
    const user = await this.prisma.users.findUnique({
      where: { ...query },
    });
    if (!user) {
      throw ERR.TOKEN.INVALID;
    }
    const payload = new PayloadJwtDto(user).toPlain();

    const { accessToken } = await this.generateTokens(payload, true);
    return {
      data: {
        accessToken,
      },
    };
  }

  private async generateTokens(
    payload: PayloadJwtDto,
    isGenerateOnlyAccessToken = false,
  ) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: CONFIG.token.accessSecret,
      expiresIn: CONFIG.token.accessExpiresIn,
    });

    const refreshToken = isGenerateOnlyAccessToken
      ? ''
      : await this.jwtService.signAsync(payload, {
          secret: CONFIG.token.refreshSecret,
          expiresIn: CONFIG.token.refreshExpiresIn,
        });

    return {
      accessToken,
      refreshToken,
    };
  }

  private verifyToken({
    accessToken,
    refreshToken,
  }: {
    accessToken?: string;
    refreshToken?: string;
  }) {
    try {
      if (accessToken) {
        const payload: PayloadJwtDto = this.jwtService.verify(accessToken, {
          secret: CONFIG.token.accessSecret,
        });
        return payload;
      }

      if (refreshToken) {
        const payload: PayloadJwtDto = this.jwtService.verify(refreshToken, {
          secret: CONFIG.token.refreshSecret,
        });
        return payload;
      }
    } catch (error) {}
    return null;
  }

  private async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await argon2.verify(hash, password);
  }

  async resetPassword(body: BodyResetPasswordDto): ResService {
    return {
      data: {
        message: 'Vui lòng kiểm tra email để đặt lại mật khẩu',
      },
    };
  }
}
