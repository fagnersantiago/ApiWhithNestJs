import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './users/database/database.config';
import { UsersModule } from './users/user.modules';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule],
})
export class AppModule {}
