import { IsEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
