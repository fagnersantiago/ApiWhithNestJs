/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
import { hashSync } from 'bcrypt';

import { ApiProperty } from '@nestjs/swagger/dist';
@Entity('clients')
export class Clients {
  @ApiProperty({ example: '123456789', description: 'The id of user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'john', description: 'The name of user' })
  @Column()
  name: string;

  @ApiProperty({ example: 'john@email', description: 'email of user' })
  @Column()
  email: string;

  @ApiProperty({ example: '123456789', description: 'password of user' })
  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
  constructor(data?: Partial<Clients>) {
    this.id = data?.id;
    this.email = data?.email;
    this.name = data?.name;
    this.password = data?.password;
  }
}
