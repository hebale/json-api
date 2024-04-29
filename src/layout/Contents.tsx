import React from "react";
import { Box } from "@mui/material";

import Pipeline from "~/dialog/EditPipeline/Contents";
import type { ContentsProps } from "~/types/layout";

const defaultJs = `function pipeline(request, response) {\n  const { query, body} = request;\n  // code goes here\n\n\n  return response;\n}`;

const Contents = ({ children }: ContentsProps) => {
  return (
    <>
      <Pipeline path="/data" value={defaultJs} />
      <Box id="contents">{children}</Box>
    </>
  );
};

export default Contents;
