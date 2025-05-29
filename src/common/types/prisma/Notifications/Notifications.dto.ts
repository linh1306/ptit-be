import { ApiProperty } from '@nestjs/swagger';

export class NotificationsDto {
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
}
