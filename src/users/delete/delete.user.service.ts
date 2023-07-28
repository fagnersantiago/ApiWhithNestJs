/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clients } from '../entities/users.entites';

@Injectable()
export class DeleteUserService {
  @InjectRepository(Clients)
  private deleleUserRepository: Repository<Clients>;

  public async delete(id: number): Promise<Clients | void> {
    const userId = await this.deleleUserRepository.findOne({
      where: { id: id },
    });
    if (!userId) {
      throw new NotFoundException('Not found');
    }

    await this.deleleUserRepository.delete(userId.id);
  }
}
