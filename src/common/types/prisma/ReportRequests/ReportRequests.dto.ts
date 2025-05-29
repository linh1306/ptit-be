import { ApiProperty } from '@nestjs/swagger';

export class ReportRequestsDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  date: Date;
  @ApiProperty({
    type: 'integer',
    format: 'int32',
    isArray: true,
  })
  requestCount: number[];
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
}
