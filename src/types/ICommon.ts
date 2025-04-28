/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IQueryParams {
  pageSize?: number;
  pageIndex?: number;
}

export interface IPagination {
  count: number;
  page: number;
  pageSize: number;
  totalPage: number;
}

export interface IOptionSelect {
  label: string;
  value: string;
}

export interface IObjectLiteral {
  [key: string]: any;
}
