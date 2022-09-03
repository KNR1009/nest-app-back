import { IsOptional, IsString } from 'class-validator';

// クライアントから送られてくるリクエストの型定義
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  nickname?: string;
}
