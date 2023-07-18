import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';

import { UsersService } from './users.services';
import { Clients } from './entities/users.entites';
@Controller()
export class UserController {
  constructor(private userService: UsersService) {}

  @Get()
  public async getAll() {
    const listUser = await this.userService.get();
    return listUser;
  }

  @Post('/clients')
  public async create(@Body() user: Clients): Promise<Clients> {
    const userCreated = await this.userService.create(user);
    return userCreated;
  }
  @Delete('/:id')
  public async delete(@Param('id') id: string): Promise<void> {
    return await this.userService.delete(Number(id));
  }
}
