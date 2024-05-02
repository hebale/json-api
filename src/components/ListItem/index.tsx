import React, { useState, createContext } from 'react';
import { Accordion } from '@mui/material';

import Summary from './Summary';
import Details from './Details';

import type { ApiData } from '~/types/components';

export const ApiContext = createContext<ApiData | null>(null);

const ListItems = ({ filter, data }: { filter: string; data: ApiData }) => {
  const [expand, setExpand] = useState(false);
  const onToggleExpand = () => {
    setExpand((prev) => !prev);
  };
  return (
    <ApiContext.Provider value={data}>
      <Accordion expanded={expand}>
        <Summary filter={filter} onToggleExpand={onToggleExpand} />
        <Details />
      </Accordion>
    </ApiContext.Provider>
  );
};

export default ListItems;
