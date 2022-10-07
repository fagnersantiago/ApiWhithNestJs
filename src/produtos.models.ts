/* eslint-disable prettier/prettier */
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ProdutosController } from './produtos.controller';

@Table
export class ProdutosModel extends Model<ProdutosController> {
  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  preco: number;
}
