import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request as ExpressRequest } from 'express'; // Đổi tên Request từ express
import {
  IResSignIn,
  IResSignOut,
  IResSignUp,
  SignInDto,
  SignUpDto,
} from '../common/type/auth.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('getMe')
  getMe(@Request() req: ExpressRequest): Promise<User> {
    return this.authService.getMe(req);
  }

  @Post('signIn')
  signIn(@Body() body: SignInDto): Promise<IResSignIn> {
    return this.authService.signIn(body);
  }

  @Post('signUp')
  signUp(@Body() body: SignUpDto): Promise<IResSignUp> {
    return this.authService.signUp(body);
  }

  @Post('signOut')
  signOut(@Request() req: ExpressRequest): Promise<IResSignOut> {
    return this.authService.signOut(req);
  }
}
