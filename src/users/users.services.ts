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

  public async getUserById(email: string): Promise<Clients | undefined> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    return user;
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
