import React, { useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Tooltip, IconButton } from "@mui/material";
import type { IconButtonProps } from "@mui/material";

type Upload = {};

import UploadIcon from "@mui/icons-material/Upload";

const HiddenInput = styled("input")({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: 1,
  height: 1,
  clip: "rect(0, 0, 0, 0)",
  clipPath: "inset(50%)",
  overflow: "hidden",
  whiteSpace: "nowrap",
});

const UploadFile = ({ extensions, ...rest }: IconButtonProps) => {
  const inputRef = useRef(null);

  const onChange = (e: InputEvent) => {
    const file = (e.target as HTMLInputElement | null).files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    console.log(URL.createObjectURL(file));

    reader.onload = () => {
      console.log(reader.result);
      // throw "is error";
    };

    reader.onerror = () => {
      console.log("i cacth error");
    };
  };

  return (
    <Tooltip ref={inputRef} title="JSON download" placement="top" arrow>
      <IconButton component="label" tabIndex={-1} {...rest}>
        <UploadIcon />
        <HiddenInput type="file" onChange={onChange} />
      </IconButton>
    </Tooltip>
  );
};

export default UploadFile;
