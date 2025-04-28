import { useMutation, useQuery } from "@tanstack/react-query";

import { API_URL } from "../shared/constants/common";
import { request } from "../shared/utils/request";
import { IPagination, IProduct, IProductType, IQueryParams } from "../types";

export const getProductType = (): Promise<{
  data: Array<IProductType>;
  pagination: IPagination;
}> => request.get(`${API_URL}/product-types`);

export const getProducts = (
  params?: IQueryParams
): Promise<{ data: Array<IProduct>; pagination: IPagination }> =>
  request.get(`${API_URL}/products`, { params });
export const createProduct = (data: Omit<IProduct, "_id">) =>
  request.post(`${API_URL}/products/create`, data);
export const updateProduct = (data: Omit<IProduct & { id: string }, "_id">) =>
  request.post(`${API_URL}/products/update`, data);
export const deleteProduct = (data: { id: string }) =>
  request.post(`${API_URL}/products/delete`, data);

export const useQueryGetProducts = (params = {}, options = {}) =>
  useQuery({
    queryKey: ["GET_PRODUCTS", params],
    queryFn: () => getProducts(params),
    ...options,
  });
export const useQueryGetProductType = (options = {}) =>
  useQuery({
    queryKey: ["GET_PRODUCT_TYPE"],
    queryFn: () => getProductType(),
    ...options,
  });

export const useCreateProductMutation = () =>
  useMutation({ mutationFn: createProduct });
export const useUpdateProductMutation = () =>
  useMutation({ mutationFn: updateProduct });
export const useDeleteProductMutation = () =>
  useMutation({ mutationFn: deleteProduct });
