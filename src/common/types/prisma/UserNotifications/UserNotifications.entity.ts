import { UsersDto } from '../Users';
import { NotificationsDto } from '../Notifications';
import { ApiProperty } from '@nestjs/swagger';
export class UserNotificationsEntity {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  userId: string;
  @ApiProperty({
    type: 'string',
  })
  notificationId: string;
  @ApiProperty({
    type: 'boolean',
  })
  isRead: boolean;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
  @ApiProperty({
    type: () => UsersDto,
    required: false,
  })
  user?: UsersDto;
  @ApiProperty({
    type: () => NotificationsDto,
    required: false,
  })
  notification?: NotificationsDto;
}
