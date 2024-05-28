import React, { useState, useEffect } from 'react';
import { Container, Grid, Stack, Divider, Typography } from '@mui/material';
import { getAllApis } from '~/api';

import Header from '~/layout/Header';
import Contents from '~/layout/Contents';
import Aside from '~/layout/Aside';

import ListItem from '~/components/ListItem';
import SearchBar from '~/components/SearchBar';
import CreateApiDialog from '~/dialog/CreateApiDialog';

const Main = () => {
  const { data, isPending, dataUpdatedAt } = getAllApis();
  const [apis, setApis] = useState(data);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    setApis(data);
  }, [dataUpdatedAt]);

  const onSearchApi = (str: string) => {
    setKeyword(str);
  };

  return (
    <Container maxWidth={false}>
      <Header
        left={
          <Typography>{`http://localhost:${process.env.SERVER_PORT}/`}</Typography>
        }
        right={
          <>
            <SearchBar onSearch={onSearchApi} />
            <CreateApiDialog title={'API 등록'} />
          </>
        }
      />
      <Divider />
      <Grid spacing={2} container>
        <Grid xs={5} item>
          <Aside />
        </Grid>
        <Grid xs={7} item>
          {apis && (
            <Contents
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default Main;
