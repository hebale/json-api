import React, { useState, useEffect } from "react";
import { Stack, ButtonGroup, Tooltip, IconButton } from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";

import CopyButton from "~/features/CopyButton";
import Monaco from "~/features/Monaco";

import useAlert from "~/hooks/useAlert";
import { updateJsonData } from "~/api";

type EditorProps = {
  name?: string;
  value: string;
  height: number;
};

const Editor = ({ name, value, height }: EditorProps) => {
  const [code, setCode] = useState<string | null>(value ?? null);
  const [isChanged, setIsChanged] = useState(false);

  const { openAlert } = useAlert();

  useEffect(() => {
    setIsChanged(value === code);
  }, [code]);

  const onSaveCode = async () => {
    const response = await updateJsonData({ name, data: code });

    response
      ? openAlert({ type: "success", message: "data가 업데이트 되었습니다." })
      : openAlert({
          type: "error",
          message: "오류가 발생했습니다. 다시 시도해 주세요.",
        });
  };

  return (
    <>
      <Stack
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ mt: 4, borderRadius: "4px 4px 0 0", background: "#1e1e1e" }}
      >
        <ButtonGroup
          variant="outlined"
          size="small"
          sx={{
            "> .MuiIconButton-root": { color: "#fff" },
            "> .MuiIconButton-root.Mui-disabled": { color: "#ffffff55" },
          }}
        >
          <CopyButton
            text={code}
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
          <Tooltip title="Refresh" placement="top" arrow>
            <IconButton onClick={() => setCode(value)} disabled={isChanged}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Save" placement="top" arrow>
            <IconButton onClick={onSaveCode} disabled={isChanged}>
              <SaveIcon />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </Stack>
      <Monaco
        value={code ?? ""}
        height={height}
        boxStyle={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
        onChange={(data) => setCode(data ?? "")}
      />
    </>
  );
};

export default Editor;
