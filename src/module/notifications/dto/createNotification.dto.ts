import { ApiProperty } from '@nestjs/swagger';
import { CreateNotificationsDto } from '@types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CustomCreateNotificationDto extends CreateNotificationsDto {
  @IsNotEmpty()
  @IsString({ each: true })
  @ApiProperty({
    description: 'Array of user IDs to send notification to',
    type: [String],
    example: ['userId1', 'userId2'],
  })
  usersId: string[];
}
