import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class BodyResetPasswordDto {
  @ApiProperty({
    example: 'nguyenlinh13602@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
