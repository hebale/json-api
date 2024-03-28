import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Summary from "./Summary";
import Methods from "./Methods";
import Editor from "./Editor";

import type { ApiListItemProps } from "~/types/components";

const style = {
  py: 1,
  ".Mui-expanded": {
    m: 0,
  },
  ".MuiAccordionSummary-content": {
    m: 0,
    alignItems: "center",
    justifyContent: "space-between",
  },
};

const onUpdateData = (type: string, params) => {
  console.log(type, params);
};

const ApiListItem = ({
  apiPath,
  headers,
  methods,
  response,
}: Partial<ApiListItemProps>) => {
  const [expand, setExpand] = useState(true);
  const onToggleExpand = () => {
    setExpand((prev) => !prev);
  };

  const converter = (value) => {
    if (typeof value === "string") {
      return value;
    }

    return JSON.stringify(value);
  };

  return (
    <Accordion expanded={expand} sx={{ border: "1px solid #eee" }}>
      <AccordionSummary
        expandIcon={
          <IconButton onClick={onToggleExpand}>
            <ExpandMoreIcon />
          </IconButton>
        }
        sx={{ ...style }}
      >
        <Summary {...{ apiPath: apiPath as string }} />
      </AccordionSummary>
      <AccordionDetails>
        <Methods {...{ apiPath: apiPath as string, headers, methods }} />
        <Editor
          {...{ apiPath: apiPath as string }}
          value={converter(response)}
          height={260}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default ApiListItem;
