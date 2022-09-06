import { IsEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
