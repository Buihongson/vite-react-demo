import { useMutation, useQuery } from "@tanstack/react-query";

import { API_URL, API_VERSION } from "../shared/constants/common";
import { request } from "../shared/utils/request";
import { IPagination, IQueryParams } from "../types";
import { IBank, IBankAccount } from "../types/IBank";

export const getBanks = (params?: IQueryParams): Promise<{ data: Array<IBank>; pagination: IPagination }> =>
  request.get(`${API_URL}/banks`, { params });
export const getAccountBankDetail = (id?: string): Promise<{ data: IBankAccount }> =>
  request.get(`${API_URL}/bank-accounts/${id}`);
export const getBankAccount = (params?: IQueryParams): Promise<{ data: Array<IBankAccount>; pagination: IPagination }> =>
  request.get(`${API_URL}/bank-accounts`, { params });
export const deleteBank = (data: {
  id: string;
}) =>
  request.post(`${API_VERSION}/banks/delete`, data);
export const createBank = (data: Pick<IBankAccount, 'accountName' | 'accountNo' | 'acqId' | 'type' | 'bank'>) =>
  request.post(`${API_VERSION}/bank-accounts/create`, data);
export const updateBankAccount = (data: Pick<IBankAccount, 'accountName' | 'accountNo' | 'acqId' | 'type' | 'bank'> & {
  bankId: string
}) =>
  request.post(`${API_VERSION}/bank-accounts/update`, data);
export const deleteBankAccount = (data: {
  id: string;
}) =>
  request.post(`${API_VERSION}/bank-accounts/delete`, data);

export const useQueryGetBanks = (params = {}, options = {}) =>
  useQuery({
    queryKey: ["GET_BANKS", params],
    queryFn: () => getBanks(params),
    ...options,
  });
export const useQueryGetBankDetail = (id: string, options = {}) =>
  useQuery({
    queryKey: ["GET_BANK_DETAIL", id],
    queryFn: () => getAccountBankDetail(id),
    ...options,
  });
export const useQueryGetBankAccount = (params = {}, options = {}) =>
  useQuery({
    queryKey: ["GET_BANK_ACCOUNT", params],
    queryFn: () => getBankAccount(params),
    ...options,
  });

export const useDeleteBankMutation = () => useMutation({ mutationFn: deleteBank });
export const useCreateBankMutation = () => useMutation({ mutationFn: createBank });
export const useUpdateBankAccMutation = () => useMutation({ mutationFn: updateBankAccount });
export const useDeleteBankAccountMutation = () => useMutation({ mutationFn: deleteBankAccount });
