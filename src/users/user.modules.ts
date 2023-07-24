import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './users.controller';
import { UsersService } from './users.services';
import { Clients } from './entities/users.entites';
import { AuthService } from './auth/auth.services';

@Module({
  imports: [TypeOrmModule.forFeature([Clients])],
  controllers: [UserController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
