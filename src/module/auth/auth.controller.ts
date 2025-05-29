import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BodySignInDto, ResSignInDto } from './dto/signIn.dto';
import {
  BodyRefreshTokenDto,
  ResRefreshTokenDto,
} from './dto/refresh-token.dto';
import { ApiTags } from '@nestjs/swagger';
import { BodySignUpDto } from './dto/signUp.dto';
import { BodyResetPasswordDto } from './dto/reset-password.dto';
import { ApiSwagger } from '@app/common/decorators/apiSwagger.decorator';
import { ResMessage, UsersDto } from '@types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('signIn')
  @ApiSwagger({
    summary: 'Đăng nhập',
    response: {
      type: ResSignInDto,
    },
  })
  signIn(@Body() body: BodySignInDto) {
    return this.auth.signIn(body);
  }

  @Post('signUp')
  @ApiSwagger({
    summary: 'Đăng ký',
    response: { type: UsersDto },
  })
  signUp(@Body() body: BodySignUpDto) {
    return this.auth.signUp(body);
  }

  @Post('refresh-token')
  @ApiSwagger({
    summary: 'Refresh token',
    response: { type: ResRefreshTokenDto },
  })
  refreshToken(@Body() body: BodyRefreshTokenDto) {
    return this.auth.refreshToken(body);
  }

  @Post('reset-password')
  @ApiSwagger({
    summary: 'Đặt lại mật khẩu',
    response: { type: ResMessage },
  })
  resetPassword(@Body() body: BodyResetPasswordDto) {
    return this.auth.resetPassword(body);
  }
}
