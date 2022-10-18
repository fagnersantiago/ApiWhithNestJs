/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModules } from './user.modules';
import { UserController } from './users.controller';
import { UsersService } from './users.services';

@Module({
  imports: [UserModules],
  providers: [UsersService],
  controllers: [UserController],
})
export class UserHttp {}
