import http from './http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getApi } from '~/api';
import queryKeys from './key';

import type { ApiData } from '~/types/components';

export const postApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: any) => http.post('/api/v1/json', { body: params }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
    },
  });
};

export const putApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: any) => http.put('/api/v1/json', { body: params }),
    onSuccess: (_, variables) => {
      // queryClient.invalidateQueries({ queryKey: queryKeys.list(variables) });

      console.log(queryClient.getQueryData(queryKeys.list(variables)));
    },
  });
};

export const patchApiMethods = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: any) =>
      http.patch('/api/v1/json/methods', { body: params }),
    onSuccess: (_, variables) => {
      const { path, method, delay, status } = variables;

      !queryClient.setQueryData(queryKeys.all, (oldDatas: ApiData[]) => {
        oldDatas.map((oldData) => {
          if (oldData.path !== path) return oldData;
          oldData.methods = oldData.methods.map((_method) => {
            if (method === _method.method) {
              _method = { ..._method, delay, status };
            }
            return _method;
          });
        });
        return oldDatas;
      });
    },
  });
};

export const deleteApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (path: string) =>
      http.delete('/api/v1/json', { body: { path } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
    },
  });
};
