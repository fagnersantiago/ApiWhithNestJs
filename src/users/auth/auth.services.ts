/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users.services';
import { JwtService } from '@nestjs/jwt';
import { SingDTO } from './dto/signDto';
import { compareSync } from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getUserById(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValidPassword = compareSync(password, user.password);

    if (user && isValidPassword) return user;

    return null;
  }

  async login(user: SingDTO) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
