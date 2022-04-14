import { Discount } from './discount';
import { ShoppingCart } from './shopping-cart';
import { CartItem } from './interfaces/card-item';

const createSut = () => {
  const discountMock = createDiscountMock();
  const sut = new ShoppingCart(discountMock);
  return { sut, discountMock };
};

const createDiscountMock = () => {
  class DiscountMock extends Discount {}
  return new DiscountMock();
};

const createCartItem = (name: string, price: number) => {
  class CartItemMock implements CartItem {
    constructor(public name: string, public price: number) {}
  }

  return new CartItemMock(name, price);
};

const createSutWithProducts = () => {
  const { sut, discountMock } = createSut();
  sut.addItem(createCartItem('Camiseta', 29));
  sut.addItem(createCartItem('Calça', 35));

  return { sut, discountMock };
};

describe('Shopping-cart', () => {
  it('should be an empty carth when no product is added', () => {
    const { sut } = createSut();
    expect(sut.isEmpty()).toBe(true);
  });

  it('should have 2 cart items', () => {
    const { sut } = createSutWithProducts();
    expect(sut.itens.length).toBe(2);
  });

  it('should test total and totalWithDiscount', () => {
    const { sut } = createSutWithProducts();
    expect(sut.total).toBe(64);
    expect(sut.totalWidthDiscount()).toBe(64);
  });

  it('should add products and clear cart', () => {
    const { sut } = createSutWithProducts();
    sut.clear();
    expect(sut.itens.length).toBe(0);
  });

  it('should remove products', () => {
    const { sut } = createSutWithProducts();
    sut.removeItem(1);
    expect(sut.itens.length).toBe(1);
  });

  it('should call discount.calculate once when totalWithDiscount is called', () => {
    const { sut, discountMock } = createSutWithProducts();
    const discontMockSpy = jest.spyOn(discountMock, 'calculate');
    sut.totalWidthDiscount();
    expect(discontMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should call discount.calculate with total price totalWithDiscount when is called', () => {
    const { sut, discountMock } = createSutWithProducts();
    const discontMockSpy = jest.spyOn(discountMock, 'calculate');
    sut.totalWidthDiscount();
    expect(discontMockSpy).toHaveBeenCalledWith(sut.total);
  });
});
