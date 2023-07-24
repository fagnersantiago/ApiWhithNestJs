/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.services';
import { UsersModule } from '../user.modules';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AppController } from './auth.controller';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AppController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
