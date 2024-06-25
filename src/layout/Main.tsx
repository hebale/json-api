import React, { useState } from 'react';
import { Container, Divider, Typography } from '@mui/material';

import Header from '~/layout/Header';
import MenuBar from './MenuBar';
import Contents from '~/layout/Contents';
import SearchBar from '~/components/SearchBar';

import ApiBox from '~/components/ApiBox';
import CreateBox from '~/components/CreateBox';
import PipelineBox from '~/components/PipelineBox';
import LogBox from '~/components/LogBox';
import CreateApiDialog from '~/dialog/CreateApiDialog';

const itemsConfig = [
  { key: 'api', component: <ApiBox /> },
  { key: 'create', component: <CreateBox /> },
  // { key: 'pipeline', component: <PipelineBox /> },
  // { key: 'log', component: <LogBox /> },
];

const Main = () => {
  const [menus, setMenus] = useState(['api']);

  const onSearchApi = (str: string) => {
    // console.log(str);
  };

  return (
    <Container className="container" maxWidth={false}>
      {/* <Header>
        <>
          <Typography>{`http://localhost:${process.env.SERVER_PORT}/`}</Typography>
          <SearchBar onSearch={onSearchApi} />
        </>
      </Header> */}
      <Divider />
      <Contents
        ribbon={
          <MenuBar
            datas={itemsConfig.map((menu) => menu.key)}
            onChange={setMenus}
          />
        }
        items={menus.map(
          (menu) =>
            itemsConfig.filter((item) => {
              return item.key === menu;
            })[0]
        )}
      />
    </Container>
  );
};

export default Main;
