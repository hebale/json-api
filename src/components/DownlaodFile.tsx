import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

import type { IconButtonProps } from "@mui/material";
import type { DownloadFileProps } from "~/types/features";

const DownloadFile = ({
  url,
  fileName = `api_json_${new Date().getTime()}`,
  ...rest
}: DownloadFileProps & IconButtonProps) => {
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
    <Tooltip title="JSON download" placement="top" arrow>
      <IconButton onClick={onClick} {...rest}>
        <DownloadIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DownloadFile;
