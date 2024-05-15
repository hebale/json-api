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
    }, 1000),
    []
  );

  const onChange = (datas: KeyValueData[]) => {
    if (headers.length === datas.length) {
      fetchCall(datas);
    } else {
      mutate({ path, headers: datas });
    }
  };

  return <KeyValueInput datas={headers} onChange={onChange} />;
};

export default Headers;
