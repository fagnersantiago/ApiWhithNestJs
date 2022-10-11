/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.models';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private user: typeof User,
  ) {}

  public async get(): Promise<User> {
    return this.user.findAll();
  }

  public async create({ user }: { user: User }): Promise<User[]> {
    return this.user.create(user);
  }
}
