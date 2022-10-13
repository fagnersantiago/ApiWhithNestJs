/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestJS/typeorm';
import { UsersService } from './users.services';
import { UserController } from './users.controller';
import { User } from './users.entites';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UserController],
})
export class UserModules {}
