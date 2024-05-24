import React, { useState, useEffect, useCallback, useContext } from 'react';
import { ApiContext } from '~/components/ListItem';
import { patchApiMethod, putApiMethod, deleteApiMethod } from '~/api';
import { debounce } from '~/utils';
import Method from './Method';
import type { ApiData } from '~/types/components';

type MethodsProps = {
  data: MethodData;
  onChange: (data: MethodData) => void;
};

type MethodData = {
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

  const onDebounceMutate = useCallback(
    debounce(
      (params: Omit<MethodData, 'isActive'>) => patchMutate(params),
      1500
    ),
    []
  );

  const onChange = (data: MethodData) => {
    const { isActive, name: method, delay, status } = data;

    if (!methods[method]) return putApiMutate({ path, method });
    if (methods[method] && !isActive) return deleteMutate({ path, method });

    methods[method].delay === delay
      ? patchMutate({ path, method, delay, status })
      : onDebounceMutate({ path, method, delay, status });
  };

  return methodNames.map((name) => {
    const methodData = methods[name]
      ? { name, isActive: true, ...methods[name] }
      : { name, isActive: false, delay: 0, status: 200 };

    return <Method key={name} data={methodData} onChange={onChange} />;
  });
};

export default Methods;
