import http from './http';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import queryKeys from './key';

import type { ApiListItemProps } from '~/types/components';

/* useQuery */
export const getAllApis = () =>
  useQuery({
    queryKey: queryKeys.all,
    queryFn: async () => {
      const response = await http.get('/api/v1/all');
      if (response?.code === 200) return response.data as ApiListItemProps[];
    },
  });

export const getApi = (params: string) =>
  useQuery({
    queryKey: queryKeys.list(params),
    queryFn: async () => {
      const response = await http.get(`/api/v1/json?path=${params}`);
      if (response?.code === 200) return response.data as ApiListItemProps;
    },
  });

export const getJsonMethos = async ({
  path,
  method,
}: {
  [key: string]: string;
}) => {
  const response = await http.get(
    `/api/v1/json/method?path=${path}&method=${method}`
  );
  if (response?.code === 200) return response;
};

export const postJson = async (params: any) => {
  const response = await http.post('/api/v1/json', { body: params });
  if (response?.code === 200) return response;
};

export const putJson = async (params: any) => {
  const response = await http.put('/api/v1/json', { body: params });
  if (response?.code === 200) return response;
};

export const patchJsonResponse = async (params: any) => {
  const response = await http.patch('/api/v1/json/response', { body: params });
  if (response?.code === 200) return response;
};

export const patchJsonMethods = async (params: any) => {
  const response = await http.patch('/api/v1/json/methods', { body: params });
  if (response?.code === 200) return response;
};

/* useMutation */
export const postApi = () =>
  useMutation({
    mutationFn: (params: any) => http.post('/api/v1/json', { body: params }),
  });

export const putApi = () =>
  useMutation({
    mutationFn: (params: any) => http.put('/api/v1/json', { body: params }),
  });

export const patchApi = () =>
  useMutation({
    mutationFn: (params: any) => http.patch('/api/v1/json', { body: params }),
  });

export const deleteApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: string) =>
      http.delete('/api/v1/json', { body: { path: params } }),
    onSuccess: (_, variables) => {
      console.log(variables);
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
    },
  });
};
