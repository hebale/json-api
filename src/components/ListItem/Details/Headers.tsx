import React, { useContext, useCallback } from 'react';

import MapInput, { MapData } from '~/features/MapInput';

import { ApiContext } from '~/components/ListItem';
import { ApiData } from '~/types/components';

import { postApiHeader, patchApiHeader, deleteApiHeader } from '~/api';
import { debounce } from '~/utils';

const Headers = () => {
  const { path, headers } = useContext(ApiContext) as ApiData;
  const { mutate: postMutate } = postApiHeader();
  const { mutate: patchMutate } = patchApiHeader();
  const { mutate: deleteMutate } = deleteApiHeader();

  const onDebounceMutate = useCallback(
    debounce(
      (
        params: Pick<ApiData, 'headers'>,
        mutate: typeof postMutate | typeof patchMutate | typeof deleteMutate
      ) => mutate(params),
      1500
    ),
    []
  );

  // fetching
  const onChange = (datas: MapData[]) => {
    if (!datas.length) return;

    console.log(datas, headers);

    if (headers.length > datas.length) {
      const key = headers.findIndex(
        (data, index) => data.uuid !== datas[index]?.uuid
      );

      return deleteMutate({ path, key });
    }

    if (datas.length > headers.length) {
      const key = datas.findIndex(
        (data, index) => data.uuid !== headers[index]?.uuid
      );
      const count = datas.length - headers.length;

      return onDebounceMutate(
        { path, key, data: datas.slice(key, key + count) },
        postMutate
      );
    }

    datas.every((data, index) => {
      const isSameKeyValue =
        data.key === headers[index].key && data.value === headers[index].value;

      isSameKeyValue
        ? patchMutate({ path, key: index, data })
        : onDebounceMutate({ path, key: index, data }, patchMutate);
    });
  };

  return <MapInput datas={headers} onChange={onChange} />;
};

export default Headers;
