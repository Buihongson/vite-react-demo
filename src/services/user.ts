import { useMutation, useQuery } from "@tanstack/react-query";

import { API_URL, API_VERSION } from "../shared/constants/common";
import { request } from "../shared/utils/request";
import { ISeller, IUser, PayloadAdmin, TYPE_STATUS_SELLER, User } from "../types/IUser";
import { IPagination, IQueryParams } from "../types";

export const login = (data: {
  username: string;
  password: string;
}): Promise<{ token: string; data: IUser }> =>
  request.post(`${API_VERSION}/user/login`, data);

export const changeStatusSeller = (data: {
  id: string;
  status: TYPE_STATUS_SELLER;
}) =>
  request.post(`${API_VERSION}/sellers/change-status`, data);

export const blockMemberSeller = (data: {
  memberId: string;
}) =>
  request.post(`${API_VERSION}/member/block-seller`, data);
export const resetAdmin = (data: {
  id: string;
}) =>
  request.post(`${API_VERSION}/user/reset-password`, data);
export const changePassword = (data: {
  password: string;
  newPassword: string;
  passwordConf: string
}) =>
  request.post(`${API_VERSION}/user/change-pw`, data);
export const createAdmin = (data: PayloadAdmin) =>
  request.post(`${API_URL}/user/register`, data);
export const getSellers = (params?: IQueryParams): Promise<{ data: Array<ISeller>; pagination: IPagination }> =>
  request.get(`${API_URL}/sellers`, { params });
export const deleteAdmin = (data: { id: string }) =>
  request.post(`${API_URL}/user/delete`, data);

export const getAdmins = (params?: IQueryParams): Promise<{ data: Array<User>; pagination: IPagination }> =>
  request.get(`${API_URL}/user/users`, { params });

export const useQueryGetSellers = (params = {}, options = {}) =>
  useQuery({
    queryKey: ["GET_SELLERS", params],
    queryFn: () => getSellers(params),
    ...options,
  });
export const useQueryGetAdmins = (params = {}, options = {}) =>
  useQuery({
    queryKey: ["GET_ADMINS", params],
    queryFn: () => getAdmins(params),
    ...options,
  });

export const useLoginMutation = () => useMutation({ mutationFn: login });
export const useChangeStatusSellerMutation = () => useMutation({ mutationFn: changeStatusSeller });
export const useBlockMemberSellerMutation = () => useMutation({ mutationFn: blockMemberSeller });
export const useChangePasswordMutation = () => useMutation({ mutationFn: changePassword });
export const useCreateAdminMutation = () => useMutation({ mutationFn: createAdmin });
export const useDeleteAdminMutation = () => useMutation({ mutationFn: deleteAdmin });
export const useResetAdminMutation = () => useMutation({ mutationFn: resetAdmin });
