import React, { useContext, useCallback } from 'react';

import MapInput, { MapData } from '~/features/MapInput';

import { ApiContext } from '~/components/ListItem';
import { ApiData } from '~/types/components';

import { patchApiHeaders } from '~/api';
import { debounce } from '~/utils';

const isDebounceChange = (origin: MapData[], mutation: MapData[]) => {
  if (origin.length > mutation.length) return false;
  if (origin.length < mutation.length) return true;

  return !origin.every(
    (data, index) =>
      data.key === mutation[index].key && data.value === mutation[index].value
  );
};

const Headers = () => {
  const { path, headers } = useContext(ApiContext) as ApiData;
  const { mutate } = patchApiHeaders();

  const onDebounceMutate = useCallback(
    debounce((params: Pick<ApiData, 'headers'>) => mutate(params), 1500),
    []
  );

  const onChange = (datas: MapData[]) => {
    isDebounceChange(headers, datas)
      ? onDebounceMutate({ path, headers: datas })
      : mutate({ path, headers: datas });
  };

  return <MapInput datas={headers} onChange={onChange} />;
};

export default Headers;
