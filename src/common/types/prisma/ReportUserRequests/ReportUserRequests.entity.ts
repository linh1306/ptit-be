import { UsersDto } from '../Users';
import { ApiProperty } from '@nestjs/swagger';
export class ReportUserRequestsEntity {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  ip: string | null;
  @ApiProperty({
    type: 'string',
  })
  userId: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  timestamp: Date;
  @ApiProperty({
    type: () => UsersDto,
    required: false,
  })
  user?: UsersDto;
}
