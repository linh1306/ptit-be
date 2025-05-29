import { ApiProperty } from '@nestjs/swagger';

export class ReportUserRequestsDto {
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
    format: 'date-time',
  })
  timestamp: Date;
}
