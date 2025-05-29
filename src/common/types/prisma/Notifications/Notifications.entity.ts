import { UserNotificationsDto } from '../UserNotifications';
import { ApiProperty } from '@nestjs/swagger';
export class NotificationsEntity {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  content: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  url: string | null;
  @ApiProperty({
    type: () => UserNotificationsDto,
    isArray: true,
    required: false,
  })
  userNotifications?: UserNotificationsDto[];
}
