import React from "react";
import { Button } from "@mui/material";

import useAlert from "~/hooks/useAlert";
import useDialog from "~/hooks/useDialog";

import TabContent from "./TabContent";

const CreateApiDialog = ({ title }: { title: string }) => {
  const { openAlert } = useAlert();
  const { openDialog } = useDialog();

  const open = () => {
    openDialog({
      title: title,
      content: <TabContent />,
      actions: [
        {
          text: "저장",
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
    <Button variant="contained" onClick={open}>
      {title}
    </Button>
  );
};

export default CreateApiDialog;
