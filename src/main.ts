import { Messaging } from './services/messaging';
import { Order } from './classes/order';
import { Persistency } from './services/persistency';
import { Product } from './classes/product';
import { ShoppingCart } from './classes/shopping-cart';
import {
  FiftyPercentDiscount,
  NoDiscount,
  TenPercentDiscount,
} from './classes/discount';
import { IndividualCostumer, EnterpriseCostumer } from './classes/customer';

// const fiftyPercentDiscount = new FiftyPercentDiscount();
// const tenPercentDiscount = new TenPercentDiscount();
const noDiscount = new NoDiscount();
const shoppingCart = new ShoppingCart(noDiscount);
const messaging = new Messaging();
const persistency = new Persistency();
const individualCostumer = new IndividualCostumer('Augusto', 'César', '0000');
// const enterpriseCostumer = new EnterpriseCostumer('Augusto', '0000--0000');

const order = new Order(
  shoppingCart,
  messaging,
  persistency,
  individualCostumer,
);

shoppingCart.addItem(new Product('Camisa', 29.99));
shoppingCart.addItem(new Product('Calça', 35.99));
shoppingCart.addItem(new Product('Casaco', 59.99));

console.log(shoppingCart.itens);
console.log(shoppingCart.total);
console.log(shoppingCart.totalWidthDiscount());
console.log(order.orderStatus);
order.checkout();
console.log(order.orderStatus);
