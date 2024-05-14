import React, { useState, createContext } from 'react';
import { Accordion } from '@mui/material';

import Summary from './Summary';
import Details from './Details';

import type { ApiData } from '~/types/components';

type ApiDispatchProps = {
  update: (key: string, value: any) => void;
};

export const ApiContext = createContext<ApiData | null>(null);
export const ApiDispatchContext = createContext<ApiDispatchProps>({
  update: () => {},
});

const ListItems = ({ filter, data }: { filter: string; data: ApiData }) => {
  const [expand, setExpand] = useState(false);
  const [api, setApi] = useState(data);

  const dispatch = {
    update: (key: string, value: any) =>
      setApi((prev) => ({ ...prev, [key]: value })),
  };

  const onToggleExpand = () => {
    setExpand((prev) => !prev);
  };

  return (
    <ApiContext.Provider value={api}>
      <ApiDispatchContext.Provider value={dispatch}>
        <Accordion expanded={expand}>
          <Summary filter={filter} onToggleExpand={onToggleExpand} />
          <Details />
        </Accordion>
      </ApiDispatchContext.Provider>
    </ApiContext.Provider>
  );
};

export default ListItems;
