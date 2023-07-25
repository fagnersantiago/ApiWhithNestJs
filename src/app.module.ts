import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/database.config';
import { UsersModule } from './users/user.modules';
import { AuthModule } from './users/auth/auth.modules';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, AuthModule],
  providers: [AuthModule],
})
export class AppModule {}
