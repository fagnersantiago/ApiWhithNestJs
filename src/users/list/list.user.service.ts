/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clients } from '../entities/users.entites';

@Injectable()
export class ListUserService {
  @InjectRepository(Clients)
  private userRepository: Repository<Clients>;

  public async get(): Promise<Clients[]> {
    return this.userRepository.find();
  }
}
