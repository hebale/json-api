import React from "react";

import { Stack } from "@mui/material";
import ApiInfo from "~/components/ApiInfo";

const Body = () => {
  return (
    <Stack sx={{ mt: 3 }}>
      <ApiInfo
        apiName={"/user"}
        method={"POST"}
        description={"사용자 정보 확인 API"}
      ></ApiInfo>
    </Stack>
  );
};

export default Body;
