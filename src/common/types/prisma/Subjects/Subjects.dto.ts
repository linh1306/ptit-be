import { ApiProperty } from '@nestjs/swagger';

export class SubjectsDto {
  @ApiProperty({
    type: 'string',
  })
  id: string;
  @ApiProperty({
    type: 'string',
  })
  code: string;
  @ApiProperty({
    type: 'string',
  })
  name: string;
}
