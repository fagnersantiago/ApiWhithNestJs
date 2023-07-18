/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clients } from './entities/users.entites';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Clients)
    private userRepository: Repository<Clients>,
  ) {}

  public async get(): Promise<Clients[]> {
    return this.userRepository.find();
  }

  public async create({ name, email, password }): Promise<Clients> {
    const user = this.userRepository.create({
      email,
      name,
      password,
    });

    await this.userRepository.save(user);
    console.log(user);
    return user;
  }
  public async delete(id: number): Promise<void> {
    const userId = this.userRepository.findOneBy({
      id,
    });
    if (!userId) {
      throw new Error('User not found');
    }

    await this.userRepository.delete((await userId).id);
  }
}
