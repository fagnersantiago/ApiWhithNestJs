import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entites';

@Controller('users')
export class UserController {
  constructor(@InjectRepository(User) private userEntities: Repository<User>) {}

  @Get()
  public async getAll(): Promise<User[]> {
    const listUser = await this.userEntities.find();
    return listUser;
  }

  @Post()
  public async create(@Body() user: User): Promise<User> {
    const userCreated = await this.userEntities.save(user);
    return userCreated;
  }
}
