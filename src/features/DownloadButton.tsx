import React from "react";
import { IconButton, Tooltip } from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

import type { DownloadButtonProps } from "~/types/features";

const DownloadButton = ({
  url,
  tooltip,
  fileName = `file_${new Date().getTime()}`,
}: DownloadButtonProps) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", `${fileName}`);

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <Tooltip {...tooltip}>
      <IconButton onClick={onClick}>
        <DownloadIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DownloadButton;
