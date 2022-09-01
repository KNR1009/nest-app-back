import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// クライアントから送られてくるリクエストの型定義
export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
