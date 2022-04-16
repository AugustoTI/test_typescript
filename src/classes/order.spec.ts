/* eslint-disable @typescript-eslint/no-empty-function */
import { Order } from './order';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';
import { CartItem } from './interfaces/card-item';
import { MessagingProtocol } from './interfaces/messaging-protocol';
import { PersistencyProtocol } from './interfaces/persistency-protocol';
import { CustomerOrder } from './interfaces/customer-protocol';

class ShoppingCartMock implements ShoppingCartProtocol {
  addItem(item: CartItem): void {}
  removeItem(index: number): void {}
  clear(): void {}
  isEmpty(): boolean {
    return false;
  }
  totalWidthDiscount(): number {
    return 1;
  }
  get total(): number {
    return 1;
  }
  get itens(): Readonly<CartItem[]> {
    return [];
  }
}

class MessaginMock implements MessagingProtocol {
  sendMessage(msg: string): void {}
}

class PersistencyMock implements PersistencyProtocol {
  saveOrder(): void {}
}

class CustomerMock implements CustomerOrder {
  getName(): string {
    return '';
  }
  getIDN(): string {
    return '';
  }
}

const createSut = () => {
  const shoppingCartMock = new ShoppingCartMock();
  const messaginMock = new MessaginMock();
  const persistencyMock = new PersistencyMock();
  const customerMock = new CustomerMock();
  const sut = new Order(
    shoppingCartMock,
    messaginMock,
    persistencyMock,
    customerMock,
  );
  return {
    sut,
    shoppingCartMock,
    persistencyMock,
    messaginMock,
  };
};

describe('Order', () => {
  it('should not checkout if cart is empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpty')
      .mockReturnValueOnce(true);
    sut.checkout();
    expect(shoppingCartMockSpy).toBeCalledTimes(1);
    expect(sut.orderStatus).toBe('Open');
  });

  it('should not checkout if cart is not empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpty')
      .mockReturnValueOnce(false);
    sut.checkout();
    expect(shoppingCartMockSpy).toBeCalledTimes(1);
    expect(sut.orderStatus).toBe('Closed');
  });

  it('should send an email to customer', () => {
    const { sut, messaginMock } = createSut();
    const messaginMockSpy = jest.spyOn(messaginMock, 'sendMessage');
    sut.checkout();
    expect(messaginMockSpy).toBeCalledTimes(1);
  });

  it('should save order', () => {
    const { sut, persistencyMock } = createSut();
    const persistencyMockSpy = jest.spyOn(persistencyMock, 'saveOrder');
    sut.checkout();
    expect(persistencyMockSpy).toBeCalledTimes(1);
  });

  it('should clear cart', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest.spyOn(shoppingCartMock, 'clear');
    sut.checkout();
    expect(shoppingCartMockSpy).toBeCalledTimes(1);
  });
});
