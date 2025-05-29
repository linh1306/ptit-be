import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginationDto } from '../../common/types/common/pagination.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateUsersDto, UsersEntity, PayloadJwtDto } from '@types';
import { User } from '@app/common/decorators/user.decorator';
import { ApiSwagger } from '@app/common/decorators/apiSwagger.decorator';
import { Roles } from '@app/common/guards/roles.guard';
import { Role } from '@prisma/client';
import { UpdateUserRoleStatusDto } from './dto/update-user-role-status.dto';
import { JwtAuthGuard } from '@app/common/guards/jwt.guard';
import { SearchUsersDto } from './dto/getUsers.dto';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly user: UsersService) {}

  @Get()
  @ApiSwagger({
    summary: 'Lấy tất cả người dùng với phân trang',
    query: SearchUsersDto,
    response: {
      type: UsersEntity,
      isArray: true,
    },
  })
  getUsers(@Query() query: SearchUsersDto) {
    return this.user.getUsers(query);
  }

  @Get(':id')
  @ApiSwagger({
    summary: 'Lấy người dùng theo ID',
    param: ['id'],
    response: {
      type: UsersEntity,
    },
  })
  getUser(@Param('id') id: string) {
    return this.user.getUser(id);
  }

  @Get('profile')
  @ApiSwagger({
    summary: 'Lấy thông tin người dùng',
    response: { type: UsersEntity },
  })
  getProfile(@User() user: PayloadJwtDto) {
    return this.user.getProfile(user);
  }

  @Patch()
  @ApiSwagger({
    summary: 'Cập nhật người dùng',
    response: {
      type: UsersEntity,
    },
  })
  update(@User('id') userId: string, @Body() updateUserDto: UpdateUsersDto) {
    return this.user.update(userId, updateUserDto);
  }

  @Patch(':userId/role-status')
  @Roles(Role.admin, Role.superAdmin)
  @ApiSwagger({
    summary: 'Admin/SuperAdmin cập nhật role và status của người dùng',
    param: ['userId'],
    response: {
      type: UsersEntity,
    },
  })
  updateRoleAndStatus(
    @Param('userId') userId: string,
    @User() user: PayloadJwtDto,
    @Body() updateUserRoleStatusDto: UpdateUserRoleStatusDto,
  ) {
    return this.user.updateRoleAndStatus(userId, user, updateUserRoleStatusDto);
  }
}
