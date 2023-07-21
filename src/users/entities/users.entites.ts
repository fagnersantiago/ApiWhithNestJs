/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
  constructor(data?: Partial<Clients>) {
    this.id = data?.id;
    this.email = data?.email;
    this.name = data?.name;
    this.password = data?.password;
  }
}
