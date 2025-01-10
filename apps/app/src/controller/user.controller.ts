import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from '../service/user.service';
import { GetUserDto } from '../common/type/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  getUser(@Query() param: GetUserDto): Promise<User[]> {
    return this.userService.getUsers(param);
  }
}
