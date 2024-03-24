import React, { useState } from "react";
import { Stack, IconButton, Tooltip } from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import CopyAllIcon from "@mui/icons-material/CopyAll";

const nameStyle = {
  width: "70%",
  px: 1.5,
  py: 1,
  borderRadius: "4px",
  fontSize: "16px",
  fontWeight: 500,
  color: "#fff",
  backgroundColor: "#1e1e1e",
};

const Summary = ({ name, onToggleAccordion }) => {
  const onCopyClipboard = (path: string) => {
    navigator.clipboard.writeText(path);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" sx={nameStyle}>
        {name}
        <Tooltip title="Copy" placement="top" arrow>
          <IconButton
            sx={{ p: 0, color: "#fff" }}
            onClick={() => onCopyClipboard(name)}
          >
            <CopyAllIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack flexDirection="row">
        <Tooltip title="JSON download" placement="top" arrow>
          <IconButton onClick={onToggleAccordion}>
            <DownloadIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="JSON upload" placement="top" arrow>
          <IconButton onClick={onToggleAccordion}>
            <UploadIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </>
  );
};

export default Summary;
