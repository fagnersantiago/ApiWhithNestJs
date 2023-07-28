import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './users.controller';
import { UsersService } from './users.services';
import { Clients } from './entities/users.entites';
import { CreateUserController } from './create/create.user.controller';
import { CreteUserService } from './create/create.user.service';
import { DeleteUserController } from './delete/delete.user.controller';
import { DeleteUserService } from './delete/delete.user.service';
import { ListUserController } from './list/list.user.controller';
import { ListUserService } from './list/list.user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Clients])],
  controllers: [
    UserController,
    CreateUserController,
    DeleteUserController,
    ListUserController,
  ],
  providers: [
    UsersService,
    CreteUserService,
    DeleteUserService,
    ListUserService,
  ],
  exports: [UsersService, CreteUserService, DeleteUserService, ListUserService],
})
export class UsersModule {}
