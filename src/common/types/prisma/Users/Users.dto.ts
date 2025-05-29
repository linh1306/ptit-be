import { Role, UserStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UsersDto {
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
  email: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  name: string | null;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  birthDate: Date | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  course: string | null;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  password: string | null;
  @ApiProperty({
    enum: Role,
    enumName: 'Role',
  })
  role: Role;
  @ApiProperty({
    enum: UserStatus,
    enumName: 'UserStatus',
  })
  status: UserStatus;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  urlAvatar: string | null;
}
