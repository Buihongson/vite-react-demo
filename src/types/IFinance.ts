type BankType = "lianLian" | "pingPong" | "bank" | "payoneer";

export interface IBankAccount {
  _id: string;
  accountNo: string;
  accountName: string;
  bank: string;
  acqId: string;
  amount: number;
  format: string;
  template: string;
  description: string;
  type: BankType;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IUsdtRate {
  bid: number;
  ask: number;
}

export interface ITransaction {
  username: string;
  amount: number;
  amountVND: number;
  orderId: string;
  status: string;
  type: string;
  currency: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
