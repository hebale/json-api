import React, { useState, useEffect } from "react";
import { Tooltip, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import useAlert from "~/hooks/useAlert";
import useDialog from "~/hooks/useDialog";

import Editor from "./Editor";
import { getJson } from "~/api";

const EditApiDialog = ({ path }: { path: string }) => {
  const { openAlert } = useAlert();
  const { openDialog } = useDialog();

  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await getJson(path);
      console.log(data);

      setCode(JSON.stringify(data));
    })();
  }, []);

  const open = () => {
    openDialog({
      title: "API 수정",
      content: <Editor value={code} height={600} />,
      actions: [
        {
          text: "삭제",
          color: "error",
          variant: "contained",
          onAction: (closeFn, contents) => {
            // closeFn();
            console.log(contents);
          },
        },
        {
          text: "수정",
          variant: "contained",
          onAction: (closeFn) => {
            openAlert({
              type: "success",
              message: "성공했습니다.",
            });

            setTimeout(() => {
              closeFn();
            }, 4000);
          },
        },
        {
          text: "취소",
          onAction: (closeFn) => closeFn(),
        },
      ],
    });
  };

  return (
    <Tooltip title="Edit" placement="top" arrow>
      <IconButton variant="contained" onClick={open}>
        <SettingsIcon />
      </IconButton>
    </Tooltip>
  );
};

export default EditApiDialog;
