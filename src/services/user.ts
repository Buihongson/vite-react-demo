import { useMutation, useQuery } from "@tanstack/react-query";

import { IUser } from "../types/IUser";
import { request } from "@/utils/request";
import { API_VERSION } from "@/constants/common";

export const login = (data: {
  username: string;
  password: string;
}): Promise<{ token: string; data: IUser }> => request.post(`${API_VERSION}/user/login`, data);
export const register = (data: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConf: string;
}): Promise<{ token: string; data: IUser }> =>
  request.post(`${API_VERSION}/sellers/register`, data);
export const verifyAccount = (data: { code: string; email: string }) =>
  request.post(`${API_VERSION}/sellers/verify`, data);
export const getProfile = (): Promise<{ data: IUser }> => request.get(`${API_VERSION}/user/me`);

export const useQueryGetProfile = (options = {}) =>
  useQuery({
    queryKey: ["GET_PROFILE"],
    queryFn: () => getProfile(),
    ...options,
  });

export const useLoginMutation = () => useMutation({ mutationFn: login });
export const useRegisterMutation = () => useMutation({ mutationFn: register });
export const useVerifyAccountMutation = () => useMutation({ mutationFn: verifyAccount });
