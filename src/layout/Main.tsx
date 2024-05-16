import React, { useState, useEffect } from 'react';
import { Container, Divider, Typography } from '@mui/material';
import { getAllApis } from '~/api';

import Header from '~/layout/Header';
import Contents from '~/layout/Contents';

import ListItem from '~/components/ListItem';
import SearchBar from '~/components/SearchBar';
import CreateApiDialog from '~/dialog/CreateApiDialog';

const Main = () => {
  const { data, isPending, dataUpdatedAt } = getAllApis();
  const [apis, setApis] = useState(data);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    console.log(data);
    setApis(data);
  }, [dataUpdatedAt]);

  const onSearchApi = (str: string) => {
    setKeyword(str);
  };

  return (
    <Container maxWidth="md">
      <Header
        left={<SearchBar onSearch={onSearchApi} />}
        right={<CreateApiDialog title={'API 등록'} />}
      />
      <Divider />

      {apis && (
        <Contents
          head={
            <Typography>{`Base URL: http://localhost:${process.env.SERVER_PORT}/`}</Typography>
          }
          body={
            isPending ? (
              <>Pending....</>
            ) : (
              apis
                .filter((api) => api.path.indexOf(keyword) > -1)
                .map((api) => (
                  <ListItem
                    key={api.path}
                    filter={keyword}
                    data={api}
                  ></ListItem>
                ))
            )
          }
        />
      )}
    </Container>
  );
};

export default Main;
