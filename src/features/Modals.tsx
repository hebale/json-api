import React, { useContext } from "react";
import { Modal, Stack, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {
  ModalStatusContext,
  ModalDispatchContext,
} from "~/contexts/ModalContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  pl: 2,
  width: 400,
  height: 300,
  transform: "translate(-50%, -50%)",
  borderRadius: "4px",
  background: "#fff",
  boxSizing: "border-box",
  "> *": {
    textAlign: "center",
  },
};

const Modals = () => {
  const modals = useContext(ModalStatusContext);
  const { close } = useContext(ModalDispatchContext);

  return (
    <>
      {modals.map((modal) => {
        if (modal.height) style.height = modal.height;
        if (modal.width) style.width = modal.width;

        return (
          <Modal key={modal.id} open={true}>
            <Stack alignContent="center" sx={{ ...style }}>
              <IconButton
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                }}
                onClick={() => close(modal.id as number)}
              >
                <CloseIcon />
              </IconButton>

              <Typography variant="h5" align="center" sx={{ pt: 2, pb: 1.5 }}>
                {modal.title}
              </Typography>

              <Box sx={{ pr: 1, overflowY: "auto" }}>{modal.body}</Box>

              <Box sx={{ mt: "auto", py: 2 }}>
                {modal.control(() => close(modal.id))}
              </Box>
            </Stack>
          </Modal>
        );
      })}
    </>
  );
};

export default Modals;
