import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '@types';
import { IsOptional, IsString } from 'class-validator';

export class SearchUsersDto extends PaginationDto {
  @ApiProperty({
    default: 10,
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string = '';
}
