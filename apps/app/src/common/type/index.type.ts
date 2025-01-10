import { User } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { Request } from 'express';

export interface ReqConfig extends Request {
  user?: User;
}

export interface IRes<T> {
  status: boolean;
  data: T;
  error?: IErr;
  metadata?: PaginationDto;
}

interface IErr {
  code: string;
  message: string;
  field?: string[];
}

export class PaginationDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  pageSize: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  total?: number;
}
