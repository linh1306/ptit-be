import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateFriendRequestsDto {
  @ApiProperty({
    type: 'string',
    default: 'pending',
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: string;
}
