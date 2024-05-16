import http from './http';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import queryKeys from './key';

import useAlert from '~/hooks/useAlert';
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
      // console.log(queryClient.getQueryData(queryKeys.list(variables)));
    },
  });
};

/**
 * issue tracking - Optimistic Updates
 */
export const patchApiHeaders = () => {
  const queryClient = useQueryClient();
  const { openAlert } = useAlert();

  return useMutation({
    mutationFn: (params: any) =>
      http.patch('api/v1/json/headers', { body: params }),
    onMutate: async (newHeaders) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.all });

      const prevData = queryClient.getQueryData(queryKeys.all);
      const { path, headers } = newHeaders;

      console.log('>>>>>>>>>>>> prev data', prevData);
      queryClient.setQueryData(queryKeys.all, (oldValue) => {
        return oldValue.map((value) => {
          if (value.path === path) {
            return { ...value, headers: [...headers] };
          }
          return value;
        });
      });

      return { prevData };
    },
    onError: (err: { status: number; message: string }, _, context) => {
      queryClient.setQueryData(queryKeys.all, context?.prevData);
      openAlert({
        type: 'error',
        message: `오류가 발생했습니다. 다시 시도해 주세요.\nstatus: ${err.status}\nmessage: ${err.message}`,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
    },
  });
};

export const patchApiMethod = () => {
  const queryClient = useQueryClient();
  const { openAlert } = useAlert();

  return useMutation({
    mutationFn: (params: any) =>
      http.patch('/api/v1/json/methods', { body: params }),
    onSuccess: (_, variables) => {
      const { path, method, delay, status } = variables;
      queryClient.setQueryData(queryKeys.all, (oldDatas: ApiData[]) => {
        oldDatas.map((oldData) => {
          if (oldData.path !== path) return oldData;
          oldData.methods = oldData.methods.map((_method) => {
            if (method === _method.method) {
              _method = {
                ..._method,
                ...(delay !== undefined && { delay }),
                ...(status && { status }),
              };
            }
            return _method;
          });
        });
        return oldDatas;
      });
    },
    onError: (err: { status: number; message: string }) => {
      openAlert({
        type: 'error',
        message: `오류가 발생했습니다. 다시 시도해 주세요.\nstatus: ${err.status}\nmessage: ${err.message}`,
      });
    },
  });
};

export const patchApiResponse = () => {
  const queryClient = useQueryClient();
  const { openAlert } = useAlert();

  return useMutation({
    mutationFn: (params: any) =>
      http.patch('/api/v1/json/response', { body: params }),
    onSuccess: (_, variables) => {
      const { path, response } = variables;

      !queryClient.setQueryData(queryKeys.all, (oldDatas: ApiData[]) => {
        oldDatas.map((oldData) => {
          if (oldData.path !== path) return oldData;
          oldData.response = JSON.parse(response);
        });
        return oldDatas;
      });
    },
    onError: (err: { status: number; message: string }) => {
      openAlert({
        type: 'error',
        message: `오류가 발생했습니다.\nstatus: ${err.status}\nmessage: ${err.message}`,
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
