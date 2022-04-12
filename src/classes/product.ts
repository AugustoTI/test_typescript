import { CartItem } from './interfaces/card-item';

export class Product implements CartItem {
  constructor(public name: string, public price: number) {}
}
