import React, { useState, useEffect } from "react";
import { Tooltip, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import useModal from "~/hooks/useModal";
import useDialog from "~/hooks/useDialog";

import Editor from "./Editor";
import { getJson, deleteJson } from "~/api";

const EditApiDialog = ({ apiPath }: { apiPath: string }) => {
  const { openDialog } = useDialog();
  const { openModal } = useModal();

  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await getJson(apiPath);
      console.log(data);

      setCode(data);
    })();
  }, []);

  const open = () => {
    openDialog({
      title: "API 수정",
      content: (
        <Editor apiPath={apiPath} value={JSON.stringify(code)} height={600} />
      ),
      actions: [
        {
          text: "삭제",
          color: "error",
          variant: "contained",
          onAction: async (closeFn, contents) => {
            const flag = await openModal({
              type: "confirm",
              title: "알림",
              message: "삭제하시겠습니까?",
            });

            if (flag) {
              const data = await deleteJson({ apiPath: code?.apiPath });
              console.log(data);
            }
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
