import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Generic GET request hook
export function useApiQuery<TData = unknown, TError = Error>(
  key: string[],
  url: string,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) {
  return useQuery<TData, TError>({
    queryKey: key,
    queryFn: async () => {
      const { data } = await api.get<TData>(url);
      return data;
    },
    ...options,
  });
}

// Generic POST request hook
export function useApiMutation<
  TData = unknown,
  TVariables = unknown,
  TError = Error,
>(
  url: string,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn">,
) {
  return useMutation<TData, TError, TVariables>({
    mutationFn: async (variables) => {
      const { data } = await api.post<TData>(url, variables);
      return data;
    },
    ...options,
  });
}

// Generic PUT request hook
export function useApiPut<
  TData = unknown,
  TVariables = unknown,
  TError = Error,
>(
  url: string,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn">,
) {
  return useMutation<TData, TError, TVariables>({
    mutationFn: async (variables) => {
      const { data } = await api.put<TData>(url, variables);
      return data;
    },
    ...options,
  });
}

// Generic DELETE request hook
export function useApiDelete<
  TData = unknown,
  TVariables = unknown,
  TError = Error,
>(
  url: string,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn">,
) {
  return useMutation<TData, TError, TVariables>({
    mutationFn: async (variables) => {
      const { data } = await api.delete<TData>(url, { data: variables });
      return data;
    },
    ...options,
  });
}
