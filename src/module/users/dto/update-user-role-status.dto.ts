import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Role, UserStatus } from '@prisma/client';

export class UpdateUserRoleStatusDto {
  @ApiProperty({
    enum: Role,
    description: 'Vai trò của người dùng',
    required: false,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @ApiProperty({
    enum: UserStatus,
    description: 'Trạng thái của người dùng',
    required: false,
  })
  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;
}