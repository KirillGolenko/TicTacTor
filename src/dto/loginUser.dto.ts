import { IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  user_name: string;

  @Length(5, 20)
  @IsNotEmpty()
  password: string;
}
