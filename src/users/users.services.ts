/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entites';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async get(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async create({ name, email }): Promise<User> {
    const user = this.userRepository.create({
      email,
      name,
    });

    return user;
  }
}
