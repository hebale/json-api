import Reacr from "react";
import { IconButton, Tooltip } from "@mui/material";

import CopyAllIcon from "@mui/icons-material/CopyAll";
import type { CopyButtonProps } from "~/types/features";

const CopyButton = ({
  text,
  tooltip,
  iconButtonStyle,
  onCopied,
}: CopyButtonProps) => {
  const onCopyClipboard = (path: string) => {
    navigator.clipboard.writeText(path);
    onCopied(path);
  };

  return (
    <Tooltip {...tooltip}>
      <IconButton
        sx={{ ...iconButtonStyle }}
        onClick={() => text && onCopyClipboard(text)}
        disabled={!text}
      >
        <CopyAllIcon />
      </IconButton>
    </Tooltip>
  );
};

export default CopyButton;
