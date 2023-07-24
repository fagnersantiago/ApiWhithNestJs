import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/database.config';
import { UsersModule } from './users/user.modules';
import { AuthModule } from './users/auth/auth.modules';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, PassportModule],
  providers: [AuthModule],
})
export class AppModule {}
