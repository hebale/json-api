import React, { useState } from "react";
import {
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import CopyAllIcon from "@mui/icons-material/CopyAll";

import ResponseController from "./ResponseController";
import CodeEditor from "./CodeEditor";

// dummy
const datas = [
  {
    path: "/user",
    methods: ["POST", "GET"],
    delay: [0, 100, 200, 0],
    status: [200, 401, 403, 500],
    data: {
      bool: false,
    },
  },
  {
    path: "/admin",
    methods: ["POST", "GET", "PATCH", "DELETE"],
    delay: [100, 200, 0, 0],
    status: [200, 401, 403, 500],
    data: {
      bool: true,
    },
  },
];

const ListItem = ({ path, methods, delay, status, data }) => {
  const [expand, setExpand] = useState(true);
  const toggleAcordion = () => {
    setExpand((prev) => !prev);
  };

  return (
    <Accordion expanded={expand} sx={{ border: "1px solid #eee" }}>
      <AccordionSummary
        expandIcon={
          <IconButton onClick={toggleAcordion}>
            <ExpandMoreIcon />
          </IconButton>
        }
        sx={{
          p: 1,
          ".MuiAccordionSummary-contentGutters": {
            m: 0,
            justifyContent: "space-between",
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            width: "70%",
            px: 1.5,
            py: 1,
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: 500,
            color: "#fff",
            backgroundColor: "#444",
          }}
        >
          {path}
          <IconButton sx={{ p: 0, color: "#fff" }} onClick={toggleAcordion}>
            <CopyAllIcon />
          </IconButton>
        </Stack>
        <Stack flexDirection="row">
          <IconButton onClick={toggleAcordion}>
            <DownloadIcon />
          </IconButton>
          <IconButton onClick={toggleAcordion}>
            <UploadIcon />
          </IconButton>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <ResponseController {...{ methods }} {...{ delay }} {...{ status }} />
        <CodeEditor {...{ data }} />
      </AccordionDetails>
    </Accordion>
  );
};

export default ListItem;
