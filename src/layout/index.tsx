import React, { useState } from 'react';
import { Container, Divider, Typography } from '@mui/material';
import { getAllApiLists } from '~/api';

import Header from '~/layout/Header';
import Contents from '~/layout/Contents';

import ListItem from '~/components/ListItem';
import SearchBar from '~/components/SearchBar';
import CreateApiDialog from '~/dialog/CreateApiDialog';

const Layout = () => {
  const { data: datas, isPending } = getAllApiLists();
  const [keyword, setKeyword] = useState('');

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
      <Contents
        head={
          <Typography>{`Base URL: http://localhost:${process.env.SERVER_PORT}/`}</Typography>
        }
        body={
          isPending ? (
            <>Pending....</>
          ) : (
            datas &&
            datas
              .filter((data) => data.path.indexOf(keyword) > -1)
              .map((data) => (
                <ListItem
                  key={data.path}
                  filter={keyword}
                  data={data}
                ></ListItem>
              ))
          )
        }
      />
    </Container>
  );
};

export default Layout;
