/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ProdutosModel } from './produtos.models';

@Injectable()
export class ProdutoService {
  produtos: ProdutosModel[] = [
    new ProdutosModel('Computador', 10),
    new ProdutosModel('Microondas', 10),
    new ProdutosModel('Mesa', 10),
  ];

  getAll(): ProdutosModel[] {
    return this.produtos;
  }

  create(produtos: ProdutosModel) {
    produtos.id = 100;
    this.produtos.push(produtos);
    return this.produtos;
  }
}
