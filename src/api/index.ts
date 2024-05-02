import http from './http';
import { useQuery } from '@tanstack/react-query';

import type { ApiListItemProps } from '~/types/components';

export const getAllApiLists = () =>
  useQuery({
    queryKey: ['allApiLists'],
    queryFn: async () => {
      const response = await http.get('/api/v1/all');
      if (response?.code === 200) return response.data as ApiListItemProps[];
    },
  });

export const getApiList = (params: string) =>
  useQuery({
    queryKey: ['apiList'],
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

export const deleteJson = async (params: any) => {
  const response = await http.delete(`/api/v1/json`, { body: params });
  if (response?.code === 200) return response;
};
