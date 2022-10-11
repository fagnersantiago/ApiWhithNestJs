import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './users.models';
import { UsersService } from './users.services';

interface IUser {
  name: string;
  email: string;
}

@Controller('users')
export class UserController {
  constructor(private readonly user: UsersService) {}

  @Get()
  public async getAll(): Promise<UsersService[]> {
    return this.user.findAll();
  }

  @Post()
  public async create(@Body() user: User): Promise<UsersService> {
    return this.user.create(user);
  }
}
