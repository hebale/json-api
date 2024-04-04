import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";

import useAlert from "~/hooks/useAlert";
import useModal from "~/hooks/useModal";
import useDialog from "~/hooks/useDialog";

import Editor from "./Editor";
import { deleteJson } from "~/api";

const EditApiDialog = ({ apiPath }: { apiPath: string }) => {
  const { openAlert } = useAlert();
  const { openModal } = useModal();
  const { openDialog } = useDialog();

  const open = () => {
    openDialog({
      title: "API 수정",
      content: <Editor path={apiPath} value={""} height={600} />,
      actions: [
        {
          text: "삭제",
          color: "error",
          variant: "contained",
          onAction: async (closeFn) => {
            const flag = await openModal({
              type: "confirm",
              title: "알림",
              message: "삭제하시겠습니까?",
            });

            if (flag) {
              const response = await deleteJson({ apiPath });

              if (!response) {
                return openAlert({
                  type: "error",
                  message: "삭제중 오류가 발생했습니다.",
                });
              }

              openAlert({
                type: "success",
                message: "삭제 되었습니다.",
              });

              closeFn();
            }
          },
        },
        {
          text: "닫기",
          onAction: (closeFn) => closeFn(),
        },
      ],
    });
  };

  return (
    <Tooltip title="JSON Edit" placement="top" arrow>
      <IconButton onClick={open}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default EditApiDialog;
