import React, { useState, useEffect } from "react";
import { Container, Divider, Typography } from "@mui/material";
import { getAllJsons } from "~/api";

import Header from "~/layout/Header";
import Contents from "~/layout/Contents";

import ApiListItem from "~/components/ApiListItem";
import ApiSearchBar from "~/components/ApiSearchBar";
import CreateApiDialog from "~/dialog/CreateApiDialog";

import type { ApiListItemProps } from "~/types/components";

const Layout = () => {
  const [apiLists, setApiLists] = useState<ApiListItemProps[]>();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    (async () => {
      const response = await getAllJsons();
      response && setApiLists(response);
    })();
  }, []);

  const onSearchApi = (str: string) => {
    setSearchText(str);
  };

  return (
    <Container maxWidth="md">
      <Header
        left={<ApiSearchBar onSearch={onSearchApi} />}
        right={<CreateApiDialog title={"API 등록"} />}
      />
      <Divider />
      <Contents>
        <>
          <Typography
            sx={{ mt: 0.5, mr: 0.2 }}
          >{`Base URL: http://localhost:${process.env.SERVER_PORT}/`}</Typography>

          {apiLists &&
            apiLists
              .filter((apiList) => apiList.path.indexOf(searchText) > -1)
              .map((apiList) => <ApiListItem {...apiList} />)}
        </>
      </Contents>
    </Container>
  );
};

export default Layout;
