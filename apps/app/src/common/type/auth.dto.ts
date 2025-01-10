import { Transform } from 'class-transformer';
import { User } from '@prisma/client';
import {
  IsDate,
  IsEmail,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

// type signIn

export class SignInDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export interface IResSignIn {
  token: string;
}

// type signUp

export class SignUpDto {
  @IsString()
  @Length(10)
  code: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  @MaxLength(30)
  name: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  date_of_birth: Date;

  @IsString()
  @Length(3)
  course: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password: string;
}

export interface IResSignUp extends User {}

//type signOut

export interface IResSignOut {
  message: string;
}
