/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users.services';

console.log('AQUI1');
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(id: number, password: string): Promise<any> {
    const user = await this.userService.getUserById(id);
    console.log('AQUI1', user);
    if (!user) {
      return user;
    }
    return null;
  }
}
