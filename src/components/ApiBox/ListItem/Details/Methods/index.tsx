import React, { useState, useEffect, useCallback, useContext } from 'react';
import { ApiContext } from '~/components/ApiBox/ListItem';
import { patchApiMethod, putApiMethod, deleteApiMethod } from '~/api';
import { debounce } from '~/utils';
import Method from './Method';
import type { ApiData } from '~/types/components';

export type MethodProps = {
  data: MethodData;
  onChange: (data: MethodData) => void;
};

export type MethodData = {
  isActive: boolean;
  name: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  delay: number;
  status: number;
};

const methodNames = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'];

const Methods = () => {
  const { path, methods } = useContext(ApiContext) as ApiData;
  const { mutate: patchMutate } = patchApiMethod();
  const { mutate: putApiMutate } = putApiMethod();
  const { mutate: deleteMutate } = deleteApiMethod();
  ``;

  const onDebounceMutate = useCallback(
    debounce((params, mutate: typeof patchMutate) => mutate(params), 1500),
    []
  );

  const onChange = (data: MethodData) => {
    const { isActive, name: method, delay, status } = data;

    /* Data Remove */
    if (!isActive) return deleteMutate({ path, key: method });

    /* Data Create */
    if (!methods.hasOwnProperty(method))
      return putApiMutate({
        path,
        key: method,
        data: { delay: 0, status: 200 },
      });

    /* Data Update */
    delay === methods[method].delay
      ? patchMutate({ path, key: method, data: { ...methods[method], status } })
      : onDebounceMutate(
          {
            path,
            key: method,
            data: { ...methods[method], delay },
          },
          patchMutate
        );
  };

  return methodNames.map((name) => {
    const methodData = methods[name]
      ? { name, isActive: true, ...methods[name] }
      : { name, isActive: false, delay: 0, status: 200 };

    return <Method key={name} data={methodData} onChange={onChange} />;
  });
};

export default Methods;
