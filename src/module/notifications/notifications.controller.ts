import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { PaginationDto } from '../../common/types/common/pagination.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@app/common/decorators/user.decorator';
import { Role } from '@prisma/client';
import { Roles } from '@app/common/guards/roles.guard';
import { CustomCreateNotificationDto } from './dto/createNotification.dto';
import { ApiSwagger } from '@app/common/decorators/apiSwagger.decorator';
import { NotificationsEntity, UserNotificationsEntity } from '@types';
import { JwtAuthGuard } from '@app/common/guards/jwt.guard';

@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @Roles(Role.admin, Role.superAdmin)
  @ApiSwagger({
    summary: 'Tạo thông báo mới',
    response: {
      type: NotificationsEntity,
    },
  })
  create(@Body() body: CustomCreateNotificationDto) {
    return this.notificationsService.create(body);
  }

  @Get('userNotifications')
  @ApiSwagger({
    summary: 'Lấy tất cả thông báo của người dùng',
    query: PaginationDto,
    response: {
      type: UserNotificationsEntity,
      isArray: true,
    },
  })
  getUserNotifications(
    @User('id') userId: string,
    @Query() query: PaginationDto,
  ) {
    return this.notificationsService.getUserNotifications(userId, query);
  }

  @Get()
  @Roles(Role.admin, Role.superAdmin)
  @ApiSwagger({
    summary: 'Admin lấy ra danh sách thông báo',
    query: PaginationDto,
    response: {
      type: NotificationsEntity,
      isArray: true,
    },
  })
  getNotifications(@Query() query: PaginationDto) {
    return this.notificationsService.getNotifications(query);
  }

  @Patch(':id/read')
  @ApiSwagger({
    summary: 'Đánh dấu thông báo đã đọc',
    param: ['id'],
    response: {
      type: UserNotificationsEntity,
    },
  })
  markAsRead(@User('id') userId: string, @Param('id') id: string) {
    return this.notificationsService.markAsRead(userId, id);
  }

  @Delete(':id')
  @ApiSwagger({
    summary: 'Xóa thông báo',
    param: ['id'],
    response: {
      type: UserNotificationsEntity,
    },
  })
  remove(@User('id') userId: string, @Param('id') id: string) {
    return this.notificationsService.remove(userId, id);
  }
}
