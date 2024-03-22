import React from "react";
import { Box } from "@mui/material";

import ApiListGroup from "~/components/ApiListGroup";
import CodeEditor from "~/components/CodeEditor";
import CreateForm from "~/components/CreateForm";

const Body = () => {
  return (
    <Box>
      {/* <ApiListGroup /> */}
      {/* <CodeEditor data="test" /> */}

      <CreateForm />
    </Box>
  );
};

export default Body;
