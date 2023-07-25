/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
import { hashSync } from 'bcrypt';
@Entity('clients')
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
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
