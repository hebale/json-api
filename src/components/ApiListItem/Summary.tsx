import React from "react";
import { Stack } from "@mui/material";

import CopyButton from "~/features/CopyButton";
import DownloadButton from "~/features/DownloadButton";
import EditApiDialog from "~/dialog/EditApiDialog";

import useAlert from "~/hooks/useAlert";

const style = {
  width: "70%",
  px: 1.5,
  py: 1,
  borderRadius: "4px",
  fontSize: "16px",
  fontWeight: 600,
  backgroundColor: "#f4f4f4",
};

const Summary = ({ path }: { path: string }) => {
  const { openAlert } = useAlert();

  return (
    <>
      <Stack direction="row" justifyContent="space-between" sx={style}>
        {path}
        <CopyButton
          text={path}
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
      <Stack flexDirection="row" sx={{ mr: 2 }}>
        <DownloadButton
          url={`/api/v1/download?path=${name}`}
          fileName={`api_${new Date().getTime()}`}
          tooltip={{
            title: "JSON Download",
            placement: "top",
            arrow: true,
          }}
        />
        <EditApiDialog path={path} />
      </Stack>
    </>
  );
};

export default Summary;
