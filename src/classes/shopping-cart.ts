import { Discount } from './discount';
import { CartItem } from './interfaces/card-item';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';

export class ShoppingCart implements ShoppingCartProtocol {
  private readonly _itens: CartItem[] = [];

  constructor(private readonly discount: Discount) {}

  addItem(item: CartItem): void {
    this._itens.push(item);
  }

  removeItem(index: number): void {
    this._itens.splice(index, 1);
  }

  isEmpty(): boolean {
    return this._itens.length === 0;
  }

  clear(): void {
    console.log('Carrinho de compras foi limpo');
    this._itens.length = 0;
  }

  totalWidthDiscount(): number {
    return this.discount.calculate(this.total);
  }

  get total(): number {
    return Number(
      this._itens.reduce((acc, valor) => acc + valor.price, 0).toFixed(2),
    );
  }

  get itens(): Readonly<CartItem[]> {
    return this._itens;
  }
}
