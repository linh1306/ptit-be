import { IsNotEmpty, IsString, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddUserDto {
  @ApiProperty({
    description: 'Danh sách ID người dùng cần thêm vào nhóm chat',
    example: ['507f1f77bcf86cd799439012', '507f1f77bcf86cd799439013']
  })
  @IsString({ each: true })
  @IsNotEmpty()
  @ArrayMinSize(1, { message: 'Users array must contain at least 1 user ID' })
  usersId: string[];
}
