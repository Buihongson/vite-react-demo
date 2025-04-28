/* eslint-disable @typescript-eslint/no-explicit-any */
export type FieldType = "string" | "number" | "boolean" | "date" | "array";

export interface IPrice {
  base: number;
  profit: number;
  sale: number;
}

export interface IDimensions {
  length: number;
  width: number;
  height: number;
}

export interface ICustomizableFields {
  name: "required" | "optional";
  note: "required" | "optional";
  [key: string]: "required" | "optional";
}

export interface IOptionValuesVariant {
  [key: string]: any;
}

export interface IProductVariant {
  optionValues: IOptionValuesVariant;
  price: IPrice;
  quantity: number;
  weight: number;
  dimensions: IDimensions;
  image?: string;
  customizableFields?: ICustomizableFields;
  isDefault?: boolean;
}

export interface IProduct {
  _id?: string;
  title: string;
  description: string;
  price?: IPrice;
  productTypeId?: string;
  categories: Array<string>;
  tags: Array<string>;
  thumbnail: Array<string>;
  images: Array<string>;
  variants?: Array<IProductVariant>;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IOptionSchema {
  _id: string;
  name: string;
  type: FieldType;
  required: boolean;
  displayName: string;
}

export interface IDefaultCustomizableFields {
  [key: string]: boolean;
}

export interface IProductType {
  _id: string;
  name: string;
  skuPrefix: string;
  optionSchema: Array<IOptionSchema>;
  defaultCustomizableFields: IDefaultCustomizableFields;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
