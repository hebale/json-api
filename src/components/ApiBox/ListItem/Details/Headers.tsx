import React, { useContext, useCallback } from 'react';
import MapInput, { MapData } from '~/features/MapInput';
import { ApiContext } from '~/components/ApiBox/ListItem';
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
        params,
        mutate: typeof postMutate | typeof patchMutate | typeof deleteMutate
      ) => mutate(params),
      1500
    ),
    []
  );

  const onChange = (datas: MapData[]) => {
    /* Data Remove */
    if (headers.length > datas.length) {
      const key = headers.findIndex(
        (data, index) => data.uuid !== datas[index]?.uuid
      );

      return deleteMutate({ path, key });
    }

    /* Data Create */
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

    /* Data Update */
    for (let i = 0; i < datas.length; i++) {
      const isContinue =
        datas[i].isActive === headers[i].isActive &&
        datas[i].key === headers[i].key &&
        datas[i].value === headers[i].value;

      if (isContinue) continue;

      const isSameKeyValue = datas[i].isActive !== headers[i].isActive;

      isSameKeyValue
        ? patchMutate({ path, key: i, data: datas[i] })
        : onDebounceMutate({ path, key: i, data: datas[i] }, patchMutate);
    }
  };

  return <MapInput datas={headers} onChange={onChange} />;
};

export default Headers;
