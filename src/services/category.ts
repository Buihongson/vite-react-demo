import { useMutation, useQuery } from "@tanstack/react-query";

import { API_URL } from "../shared/constants/common";
import { request } from "../shared/utils/request";
import { ICategory, IPagination, IQueryParams } from "../types";

export const getCategories = (
  params?: IQueryParams
): Promise<{ data: Array<ICategory>; pagination: IPagination }> =>
  request.get(`${API_URL}/categories`, { params });
export const createCategory = (data: Omit<ICategory, "_id">) =>
  request.post(`${API_URL}/categories/create`, data);
export const updateCategory = (data: Omit<ICategory & { id: string }, "_id">) =>
  request.post(`${API_URL}/categories/update`, data);
export const deleteCategory = (data: { id: string }) =>
  request.post(`${API_URL}/categories/delete`, data);

export const useQueryGetCategories = (params = {}, options = {}) =>
  useQuery({
    queryKey: ["GET_CATEGORIES", params],
    queryFn: () => getCategories(params),
    ...options,
  });

export const useCreateCategoryMutation = () =>
  useMutation({ mutationFn: createCategory });
export const useUpdateCategoryMutation = () =>
  useMutation({ mutationFn: updateCategory });
export const useDeleteCategoryMutation = () =>
  useMutation({ mutationFn: deleteCategory });
