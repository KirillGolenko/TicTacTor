import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  user_name: string;

  @IsNotEmpty()
  nickname: string;

  @Length(5, 20)
  @IsNotEmpty()
  password: string;
}
