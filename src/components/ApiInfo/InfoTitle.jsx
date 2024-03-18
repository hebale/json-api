import React from "react";
import { Stack, Chip } from "@mui/material";

const methodColor = {
  POST: "#49cc90",
  GET: "#61affe",
  PATCH: "#fca130",
  DELETE: "##f93e3e",
};

const InfoTitle = ({ method, apiName }) => {
  return (
    <Stack
      flexDirection="row"
      sx={{
        p: 1.2,
        borderRadius: "4px",
        fontSize: "16px",
        fontWeight: 500,
        color: "#fff",
        backgroundColor: "#444",
      }}
    >
      <Chip
        label={method}
        variant="outlined"
        size="small"
        sx={{
          mr: 1,
          borderRadius: "3px",
          fontSize: "12px",
          fontWeight: 600,
          color: "#fff",
          borderColor: methodColor[method],
          background: methodColor[method],
        }}
      />
      {apiName}
    </Stack>
  );
};

export default InfoTitle;
