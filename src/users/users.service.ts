import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/user.dto';
import { User, UserDocument } from 'src/schema/user.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoginUserDto } from 'src/dto/loginUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async all() {
    return this.userModel.find();
  }

  createHash = (user_name) => {
    const signature = {
      user: user_name,
      iat: Math.floor(Date.now() / 1000) - 30,
    };
    const older_token = jwt.sign(signature, 'secret');
    return older_token;
  };

  async register(createUserDto: CreateUserDto): Promise<User> {
    const dublicate = await this.userModel.findOne({
      user_name: createUserDto.user_name,
    });
    if (!dublicate) {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      createUserDto.password = hashedPassword;
      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
    } else {
      throw new HttpException('User already', HttpStatus.BAD_REQUEST);
    }
  }

  async login(data: LoginUserDto) {
    const { user_name, password } = data;
    let User;
    try {
      User = await this.userModel.findOne({ user_name: user_name });
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const isPasswordMatching = await bcrypt.compare(password, User.password);
    if (isPasswordMatching) {
      return { token: this.createHash(user_name), data: User };
    } else {
      throw new HttpException('Passworn uncorect', HttpStatus.NOT_FOUND);
    }
  }
}
