import {
  Discount,
  NoDiscount,
  FiftyPercentDiscount,
  TenPercentDiscount,
} from './discount';

const createSut = (className: new () => Discount): Discount => {
  return new className();
};

describe('Discount', () => {
  it('Should have no Discount', () => {
    const sut = createSut(NoDiscount);
    expect(sut.calculate(19.99)).toBe(19.99);
  });

  it('Should apply 50% Discount on Price', () => {
    const sut = createSut(FiftyPercentDiscount);
    expect(sut.calculate(100)).toBe(50);
  });

  it('Should apply 10% Discount on Price', () => {
    const sut = createSut(TenPercentDiscount);
    expect(sut.calculate(50)).toBe(45);
  });
});
