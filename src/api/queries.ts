import http from './http';
import { useQuery } from '@tanstack/react-query';
import queryKeys from './key';

import type { ApiListItemProps } from '~/types/components';

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

export const putJson = async (params: any) => {
  const response = await http.put('/api/v1/json', { body: params });
  if (response?.code === 200) return response;
};
