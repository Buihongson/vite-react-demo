import { useMutation, useQuery } from "@tanstack/react-query";

import { API_URL, API_VERSION } from "../shared/constants/common";
import { request } from "../shared/utils/request";
import { IPagination, IQueryParams } from "../types";
import { ITransaction } from "../types/ITransaction";

export const getTransactions = (params?: IQueryParams): Promise<{ data: Array<ITransaction>; pagination: IPagination }> =>
    request.get(`${API_URL}/transactions`, { params });
export const changeStatusTransaction = (data: {
    transactionId: string;
    status: string;
}) =>
    request.post(`${API_VERSION}/transactions/change-status`, data);
export const useQueryGetTransactions = (params = {}, options = {}) =>
    useQuery({
        queryKey: ["GET_TRANSACTIONS", params],
        queryFn: () => getTransactions(params),
        ...options,
    });

export const useChangeStatusTransactionMutation = () => useMutation({ mutationFn: changeStatusTransaction });
