/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clients } from '../entities/users.entites';

@Injectable()
export class CreteUserService {
  @InjectRepository(Clients)
  private userRepository: Repository<Clients>;

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
}
