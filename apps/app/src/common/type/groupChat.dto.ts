import { TGroupChat } from '@prisma/client';
import {
  IsEnum,
  IsMongoId,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from './index.type';

export class CreateGroupChatDto {
  @IsString()
  @MinLength(10)
  @MaxLength(30)
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsMongoId()
  userId?: string;

  @IsEnum(TGroupChat)
  @IsOptional()
  typeGroup?: TGroupChat;
}

export class GetGroupChatParamDto {
  @IsObject()
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination: PaginationDto;
}
