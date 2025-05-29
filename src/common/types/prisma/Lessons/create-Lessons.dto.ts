import { LessonType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateLessonsDto {
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  name?: string | null;
  @ApiProperty({
    enum: LessonType,
    enumName: 'LessonType',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsEnum(LessonType)
  type?: LessonType | null;
}
