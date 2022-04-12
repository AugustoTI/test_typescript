import {
  CustomerOrder,
  EnterpriseCostumerProtocol,
  IndividualCostumerProtocol,
} from './interfaces/customer-protocol';

export class IndividualCostumer
  implements IndividualCostumerProtocol, CustomerOrder
{
  constructor(
    public fistName: string,
    public lastName: string,
    public CPF: string,
  ) {}

  getName(): string {
    return this.fistName + ' ' + this.lastName;
  }
  getIDN(): string {
    return this.CPF;
  }
}

export class EnterpriseCostumer
  implements EnterpriseCostumerProtocol, CustomerOrder
{
  constructor(public name: string, public CNPJ: string) {}
  getName(): string {
    return this.name;
  }
  getIDN(): string {
    return this.CNPJ;
  }
}
