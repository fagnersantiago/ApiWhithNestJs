/* eslint-disable prettier/prettier */
import { Clients } from 'src/users/entities/users.entites';
import { PartialType, OmitType } from '@nestjs/swagger';

export class User extends Clients {}

export class Auth extends PartialType(OmitType(Clients, ['id', 'name'])) {}
