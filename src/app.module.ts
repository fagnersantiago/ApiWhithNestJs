import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosController } from './produtos.controller';
import { ProdutoService } from './produtos.services';
import { ProdutosModel } from './produtos.models';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: Number(process.env.PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([ProdutosModel]),
  ],
  controllers: [AppController, ProdutosController],
  providers: [AppService, ProdutoService],
})
export class AppModule {}
