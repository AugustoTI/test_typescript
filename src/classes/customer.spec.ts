import { EnterpriseCostumer, IndividualCostumer } from './customer';

const createIndividualCustomer = (
  fistName: string,
  lastName: string,
  cpf: string,
): IndividualCostumer => {
  return new IndividualCostumer(fistName, lastName, cpf);
};

const createEnterpriseCostumer = (
  name: string,
  CNPJ: string,
): EnterpriseCostumer => {
  return new EnterpriseCostumer(name, CNPJ);
};

describe('IndividualCostumer', () => {
  it('should have fistName, lastName and CPF', () => {
    const sut = createIndividualCustomer('augusto', 'césar', '000-000-000-00');

    expect(sut).toHaveProperty('fistName', 'augusto');
    expect(sut).toHaveProperty('lastName', 'césar');
    expect(sut).toHaveProperty('CPF', '000-000-000-00');
  });

  it('should have methods to get name and get IDN for IndividualCostumer', () => {
    const sut = createIndividualCustomer('augusto', 'césar', '000-000-000-00');

    expect(sut.getName()).toBe('augusto césar');
    expect(sut.getIDN()).toBe('000-000-000-00');
  });
});

describe('EnterpriseCostumer', () => {
  it('should have name and CNPJ', () => {
    const sut = createEnterpriseCostumer('Udemy', '222');

    expect(sut).toHaveProperty('name', 'Udemy');
    expect(sut).toHaveProperty('CNPJ', '222');
  });

  it('should have methods to get name and get IDN for EnterpriseCostumer', () => {
    const sut = createEnterpriseCostumer('Udemy', '222');

    expect(sut.getName()).toBe('Udemy');
    expect(sut.getIDN()).toBe('222');
  });
});
