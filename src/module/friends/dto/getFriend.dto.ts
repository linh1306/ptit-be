import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '@types';
import { IsOptional, IsString } from 'class-validator';

export class SearchFriendDto extends PaginationDto {
  @ApiProperty({
    default: '',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string = '';
}
