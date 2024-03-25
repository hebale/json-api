import React from "react";
import { Stack } from "@mui/material";

import CopyButton from "~/features/CopyButton";
import DownloadButton from "~/features/DownloadButton";

import useAlert from "~/hooks/useAlert";

const nameStyle = {
  width: "70%",
  px: 1.5,
  py: 1,
  borderRadius: "4px",
  fontSize: "16px",
  fontWeight: 500,
  color: "#fff",
  backgroundColor: "#303030",
};

type SummaryProps = {
  name: string;
};

const Summary = ({ name }: SummaryProps) => {
  const { openAlert } = useAlert();

  return (
    <>
      <Stack direction="row" justifyContent="space-between" sx={nameStyle}>
        {name}
        <CopyButton
          text={name}
          iconButtonStyle={{
            p: 0,
            color: "inherit",
          }}
          tooltip={{
            title: "Copy",
            placement: "top",
            arrow: true,
          }}
          onCopied={() =>
            openAlert({
              type: "info",
              message: "클립보드에 복사 되었습니다.",
            })
          }
        />
      </Stack>
      <Stack flexDirection="row">
        <DownloadButton
          url={`/api/v1/download?name=${name}`}
          fileName={`api_${new Date().getTime()}`}
          tooltip={{
            title: "JSON download",
            placement: "top",
            arrow: true,
          }}
        />
      </Stack>
    </>
  );
};

export default Summary;
