import { IsNotEmpty, IsEnum } from 'class-validator';

export class loginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

