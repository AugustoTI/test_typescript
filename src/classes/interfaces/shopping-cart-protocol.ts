import { CartItem } from './card-item';

export interface ShoppingCartProtocol {
  addItem(item: CartItem): void;

  removeItem(index: number): void;

  isEmpty(): boolean;

  clear(): void;

  totalWidthDiscount(): number;

  total: number;

  itens: Readonly<CartItem[]>;
}
