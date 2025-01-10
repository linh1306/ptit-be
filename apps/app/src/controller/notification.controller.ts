import {
  Controller,
  Get,
  Query,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PaginationDto, ReqConfig } from '../common/type/index.type';
import { UserNotification } from '@prisma/client';
import { NotificationService } from '../service/notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  getNotifications(
    @Request() req: ReqConfig,
    @Query() param: PaginationDto,
  ): Promise<UserNotification[]> {
    return this.notificationService.getNotifications(req, param);
  }
}
