import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class BodySignInDto {
  @ApiProperty({
    type: 'string',
    example: 'nguyenlinh13602@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    example: 'linh0000',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class ResSignInDto {
  @ApiProperty({
    type: 'string',
  })
  accessToken: string;

  @ApiProperty({
    type: 'string',
  })
  refreshToken: string;
}
