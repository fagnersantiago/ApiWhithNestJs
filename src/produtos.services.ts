/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProdutosModel } from './produtos.models';

type NewType = typeof ProdutosModel;

@Injectable()
export class ProdutoService {
  constructor(
    @InjectModel(ProdutosModel)
    private produtoModel: typeof ProdutosModel,
  ) {}

  async getAll(): Promise<ProdutosModel[]> {
    return this.produtoModel.findAll();
  }

  async create(produtos: ProdutosModel) {
    return this.produtoModel.create(produtos);
  }
}
