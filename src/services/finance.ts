import { useMutation, useQuery } from "@tanstack/react-query";

import { IBankAccount, IPagination, IQueryParams, ITransaction, IUsdtRate } from "../types";
import { API_URL } from "@/constants/common";
import { request } from "@/utils/request";

export const getBankAccount = (
  params?: IQueryParams
): Promise<{ data: Array<IBankAccount>; pagination: IPagination }> =>
  request.get(`${API_URL}/bank-accounts`, { params });
export const getUSDTRate = (params?: IQueryParams): Promise<{ data: IUsdtRate }> =>
  request.get(`${API_URL}/usdt-info`, { params });
export const createQRCode = (data: {
  amount: number;
  type: string;
  orderInfo?: string;
  currency: string;
}): Promise<{ data: { bank: IBankAccount; qrCode: string; transaction: ITransaction } }> =>
  request.post(`${API_URL}/transactions/create-via-qr`, data);

export const useQueryGetBankAccount = (params = {}, options = {}) =>
  useQuery({
    queryKey: ["GET_BANK_ACCOUNT", params],
    queryFn: () => getBankAccount(params),
    ...options,
  });
export const useQueryGetUSDTRate = (params = {}, options = {}) =>
  useQuery({
    queryKey: ["GET_USDT_RATE", params],
    queryFn: () => getUSDTRate(params),
    ...options,
  });

export const useCreateQRCodeMutation = () => useMutation({ mutationFn: createQRCode });
