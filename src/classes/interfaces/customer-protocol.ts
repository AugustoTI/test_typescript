export interface CustomerOrder {
  getName(): string;
  getIDN(): string;
}

export interface IndividualCostumerProtocol {
  fistName: string;
  lastName: string;
  CPF: string;
}

export interface EnterpriseCostumerProtocol {
  name: string;
  CNPJ: string;
}
