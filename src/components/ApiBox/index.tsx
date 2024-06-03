import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import { getAllApis } from '~/api';
import ListItem from './ListItem';

const ApiBox = () => {
  const { data, isPending, dataUpdatedAt } = getAllApis();
  const [apis, setApis] = useState(data);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    console.log('>>>>>>>', data);

    setApis(data);
  }, [dataUpdatedAt]);

  return (
    <Paper elevation={2} sx={{ p: 1 }}>
      {isPending ? (
        <>로딩중...</>
      ) : (
        apis &&
        apis.map((api) => (
          <ListItem key={api.path} filter={keyword} data={api} />
        ))
      )}
    </Paper>
  );
  // .filter((api) => api.path.indexOf(keyword) > -1)
};

export default ApiBox;
