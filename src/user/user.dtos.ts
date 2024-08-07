import { IsEmail, IsString } from 'class-validator';

export class SignupDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;

  @IsString()
  gender: string;
}
export class loginDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
