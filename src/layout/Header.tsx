import React from "react";
import { Stack, Button } from "@mui/material";

import ApiSearchBar from "~/components/ApiSearchBar";
import DownlaodFile from "~/components/DownlaodFile";
import UploadFile from "~/components/UploadFile";

import useModal from "~/hooks/useModal";

const Header = () => {
  const { openModal } = useModal();

  const onCreateApi = () => {
    openModal({
      title: "test modal",
      width: 600,
      height: 500,
      body: (
        <>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis
          repudiandae reiciendis ipsam facere rerum animi exercitationem ipsum
          amet magni delectus, fugit excepturi quo natus, commodi, voluptatum
          consectetur consequatur rem deserunt. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Veritatis repudiandae reiciendis ipsam
          facere rerum animi exercitationem ipsum amet magni delectus, fugit
          excepturi quo natus, commodi, voluptatum consectetur consequatur rem
          deserunt. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Veritatis repudiandae reiciendis ipsam facere rerum animi
          exercitationem ipsum amet magni delectus, fugit excepturi quo natus,
          commodi, voluptatum consectetur consequatur rem deserunt. Lorem ipsum
          dolor sit amet, consectetur adipisicing elit. Veritatis repudiandae
          reiciendis ipsam facere rerum animi exercitationem ipsum amet magni
          delectus, fugit excepturi quo natus, commodi, voluptatum consectetur
          consequatur rem deserunt. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Veritatis repudiandae reiciendis ipsam facere rerum
          animi exercitationem ipsum amet magni delectus, fugit excepturi quo
          natus, commodi, voluptatum consectetur consequatur rem deserunt. Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Veritatis
        </>
      ),
      control: (close) => (
        <Button variant="contained" onClick={close}>
          Confirm
        </Button>
      ),
    });
  };

  return (
    <Stack
      component="header"
      flexDirection="row"
      justifyContent="space-between"
      sx={{ py: 4 }}
    >
      <ApiSearchBar />
      <DownlaodFile
        url="http://localhost:8080/api/v1/download?name=/data/test"
        // fileName=""
      />
      <UploadFile />
      <Button variant="contained" onClick={onCreateApi}>
        CREATE
      </Button>
    </Stack>
  );
};

export default Header;
