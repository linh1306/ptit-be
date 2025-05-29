import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class BodySignUpDto {
  @ApiProperty({
    example: 'nguyenlinh13602@gmail.com',
  })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @ApiProperty({
    example: 'linh0000',
  })
  @IsString({ message: 'Mật khẩu phải là chuỗi' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;

  @ApiProperty({
    example: 'Nguyễn Văn Linh',
  })
  @IsString({ message: 'Tên phải là chuỗi' })
  @MinLength(2, { message: 'Tên phải có ít nhất 2 ký tự' })
  name: string;

  @ApiProperty({
    example: 'B20DCCN399',
  })
  @IsString({ message: 'Mã sinh viên phải là chuỗi' })
  @MinLength(7, { message: 'Mã sinh viên phải có ít nhất 7 ký tự' })
  code: string;

  @IsOptional()
  @IsString({ message: 'Khóa học phải là chuỗi' })
  course?: string;

  @IsOptional()
  @IsString({ message: 'Ngày sinh phải là chuỗi định dạng ISO' })
  date_of_birth?: string;
}
