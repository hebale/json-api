import React, { useState, createContext } from 'react';
import { Accordion } from '@mui/material';

import Summary from './Summary';
import Details from './Details';

import type { ApiData } from '~/types/components';

export const ApiContext = createContext<ApiData | null>(null);

export const ApiUpdateContext = createContext({ setApi: () => {} });

const ListItems = ({ filter, data }: { filter: string; data: ApiData }) => {
  const [expand, setExpand] = useState(false);

  const updater = { setApi: () => {} };

  const onToggleExpand = () => {
    setExpand((prev) => !prev);
  };
  return (
    <ApiContext.Provider value={data}>
      <ApiUpdateContext.Provider value={updater}>
        <Accordion expanded={expand}>
          <Summary filter={filter} onToggleExpand={onToggleExpand} />
          <Details />
        </Accordion>
      </ApiUpdateContext.Provider>
    </ApiContext.Provider>
  );
};

export default ListItems;
