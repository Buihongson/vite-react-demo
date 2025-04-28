/* eslint-disable @typescript-eslint/no-explicit-any */
export enum PublishToStoreStep {
  product = "step1",
  variant = "step2",
  description = "step3",
  publish = "step4",
}

export interface IMockupFile {
  id: number;
  file: File;
  imageUrl: string;
}

export interface IProduct {
  name: string;
  detail: string;
  createdAt: string;
  store: string;
  price: number;
}

export interface IVariant {
  [key: string]: any;
  prices: Array<{ regular: string; sale: string }>;
}
