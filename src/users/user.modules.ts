import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './users.controller';
import { UsersService } from './users.services';
import { Clients } from './entities/users.entites';
//import { ClientsRepository } from './'; // Certifique-se de importar o repositório

@Module({
  imports: [TypeOrmModule.forFeature([Clients])], // Certifique-se de importar o repositório usando forFeature
  controllers: [UserController], // Certifique-se de adicionar o controlador aqui
  providers: [UsersService], // Certifique-se de adicionar o serviço e o repositório aqui
})
export class UsersModule {}
