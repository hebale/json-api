import React, { useState } from "react";
import {
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ResponseController from "./ResponseController";

import Summary from "./Summary";

const SummaryStyle = {
  py: 1,
  ".Mui-expanded": {
    m: 0,
  },
  ".MuiAccordionSummary-contentGutters": {
    m: 0,
    justifyContent: "space-between",
  },
};

const onUpdateData = (type: string, params) => {
  console.log(type, params);
};

const ApiListItem = ({ name, headers, methods, data }) => {
  const [expand, setExpand] = useState(true);
  const toggleAcordion = () => {
    setExpand((prev) => !prev);
  };

  const onCopyClipboard = (path: string) => {
    navigator.clipboard.writeText(path);
  };

  return (
    <Accordion expanded={expand} sx={{ border: "1px solid #eee" }}>
      <AccordionSummary
        expandIcon={
          <IconButton onClick={toggleAcordion}>
            <ExpandMoreIcon />
          </IconButton>
        }
        sx={{ ...SummaryStyle }}
      >
        <Summary />
      </AccordionSummary>

      <AccordionDetails>
        <ResponseController
          methods={methods}
          delay={delay}
          status={status}
          onUpdateData={onUpdateData}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default ApiListItem;
