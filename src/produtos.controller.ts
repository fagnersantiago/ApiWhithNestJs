import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ProdutosModel } from './produtos.models';
import { ProdutoService } from './produtos.services';

@Controller('produtos')
export class ProdutosController {
  constructor(private produtosService: ProdutoService) {}

  @Get()
  getAll(): ProdutosModel[] {
    return this.produtosService.getAll();
  }

  @Post()
  create(@Body() produto: ProdutosModel) {
    return this.produtosService.create(produto);
  }
}
