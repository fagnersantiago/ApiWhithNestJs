/* eslint-disable prettier/prettier */
export class ProdutosModel {
  id: number;
  name: string;
  preco: number;

  constructor(name: string, preco: number) {
    this.name = name;
    this.preco = preco;
  }
}
