import React, { useContext, useCallback } from 'react';

import KeyValueInput, { KeyValueData } from '~/features/KeyValueInput';

import { ApiContext } from '~/components/ListItem';
import { ApiData } from '~/types/components';

import { patchApiHeaders } from '~/api';
import { debounce } from '~/utils';

const Headers = () => {
  const { path, headers } = useContext(ApiContext) as ApiData;
  const { mutate } = patchApiHeaders();

  const fetchCall = useCallback(
    debounce((datas: Pick<ApiData, 'headers'>) => {
      mutate({ path, headers: datas });
    }, 500),
    []
  );

  const onChange = (datas: KeyValueData[]) => {
    console.log(datas);

    if (
      headers.length !== datas.length ||
      headers.map((header) => header.isActive).join() !==
        datas.map((data) => data.isActive).join()
    ) {
      mutate({ path, headers: datas });
    } else {
      fetchCall(datas);
    }
  };

  return <KeyValueInput datas={headers} onChange={onChange} />;
};

export default Headers;
