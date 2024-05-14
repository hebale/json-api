import React, { useContext, useCallback } from 'react';

import KeyValueInput from '~/features/KeyValueInput';

import { ApiContext } from '~/components/ListItem';
import { ApiData } from '~/types/components';
import useAlert from '~/hooks/useAlert';

import { patchApiHeaders } from '~/api';
import { debounce } from '~/utils';

const Headers = () => {
  const { path, headers } = useContext(ApiContext) as ApiData;
  const { mutate } = patchApiHeaders();
  const { openAlert } = useAlert();

  const fetchCall = useCallback(
    debounce((datas: Pick<ApiData, 'headers'>) => {
      mutate(
        { path, headers: datas },
        {
          onError: () =>
            openAlert({
              type: 'error',
              message: '오류가 발생했습니다. 다시 시도해 주세요.',
            }),
        }
      );
    }, 1000),
    []
  );

  const onChange = (datas) => {
    fetchCall(datas);
  };

  return <KeyValueInput datas={headers} onChange={onChange} />;
};

export default Headers;
