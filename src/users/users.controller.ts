import { Get } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/dto/loginUser.dto';
import { CreateUserDto } from 'src/dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async all() {
    return this.usersService.all();
  }

  @Post('log-in')
  async login(@Body() registrationData: LoginUserDto) {
    return this.usersService.login(registrationData);
  }
  @Post('register')
  async register(@Body() registrationData: CreateUserDto) {
    return this.usersService.register(registrationData);
  }
}
