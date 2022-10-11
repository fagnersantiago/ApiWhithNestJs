/* eslint-disable prettier/prettier */
import { Column, Model, Table } from 'sequelize-typescript';
import { UserController } from './users.controller';

@Table
export class User extends Model {
  @Column
  name: string;
  @Column
  email: string;
}
