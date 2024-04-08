import React from "react";
import { Button } from "@mui/material";

import useAlert from "~/hooks/useAlert";
import useDialog from "~/hooks/useDialog";

import TabContext from "./TabContext";
import { postJson } from "~/api";

const CreateApiDialog = ({ title }: { title: string }) => {
  const { openAlert } = useAlert();
  const { openDialog } = useDialog();

  const open = () => {
    openDialog({
      title: title,
      content: <TabContext />,
      actions: [
        {
          text: "등록",
          variant: "contained",
          onAction: async (closeFn, contents) => {
            const data = JSON.parse(contents);
            const response = await postJson({
              path: data.path,
              data,
            });

            if (!response) {
              return openAlert({
                type: "error",
                message: "등록중 오류가 발생했습니다.",
              });
            }

            openAlert({
              type: "success",
              message: "등록 되었습니다.",
            });

            closeFn();
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
