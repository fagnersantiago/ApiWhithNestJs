/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Clients } from '../users/entities/users.entites';
import { config } from 'dotenv';
config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.PORT),
  username: 'postgres',
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [Clients],
  synchronize: true,
};
