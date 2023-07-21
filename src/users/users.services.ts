/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clients } from './entities/users.entites';

interface IUpload {
  id?: number;
  name: string;
  email: string;
  password: string;
}
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

  public async UP(file: IUpload): Promise<Clients> {
    const user = this.userRepository.create({
      email: file.email,
      name: file.name,
      password: file.password,
    });

    await this.userRepository.save(user);
    return user as Clients;
  }
}
