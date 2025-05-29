import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BodyRefreshTokenDto {
  @ApiProperty({
    example: '',
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}

export class ResRefreshTokenDto {
  @ApiProperty({
    type: 'string',
  })
  accessToken: string;
}
