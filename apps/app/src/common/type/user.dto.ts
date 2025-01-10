import { IsString } from 'class-validator';
import { PaginationDto } from './index.type';

export class GetUserDto extends PaginationDto {
  @IsString()
  query: string;
}
