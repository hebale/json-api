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

const onUpdateData = (type: string, params) => {
  console.log(type, params);
};

const ListItem = ({ path, methods, delay, status, data }) => {
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
        sx={{
          py: 1,
          ".Mui-expanded": {
            m: 0,
          },
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
          <Tooltip title="Copy" placement="top" arrow>
            <IconButton
              sx={{ p: 0, color: "#fff" }}
              onClick={() => onCopyClipboard(path)}
            >
              <CopyAllIcon />
            </IconButton>
          </Tooltip>
        </Stack>
        <Stack flexDirection="row">
          <Tooltip title="JSON download" placement="top" arrow>
            <IconButton onClick={toggleAcordion}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="JSON upload" placement="top" arrow>
            <IconButton onClick={toggleAcordion}>
              <UploadIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <ResponseController
          methods={methods}
          delay={delay}
          status={status}
          onUpdateData={onUpdateData}
        />
        <CodeEditor {...{ data }} />
      </AccordionDetails>
    </Accordion>
  );
};

export default ListItem;
