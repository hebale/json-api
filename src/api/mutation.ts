import http from './http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import queryKeys from './key';

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
      queryClient.invalidateQueries({ queryKey: queryKeys.list(variables) });
    },
  });
};

export const patchApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: any) => http.patch('/api/v1/json', { body: params }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.list(variables) });
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
