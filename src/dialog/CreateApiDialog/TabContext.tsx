import React, { useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import UploadForm from "./UploadForm";
import InputForm from "./InputForm";

const TabContent = () => {
  const [tabValue, setTabValue] = useState("upload");

  const onChangeTab = (e: React.SyntheticEvent, value: string) => {
    setTabValue(value);
  };

  return (
    <Box
      sx={{
        width: "100%",
        my: "-16px",
        typography: "body1",
      }}
    >
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={onChangeTab}>
            <Tab label="파일 업로드" value="upload" />
            <Tab label="정보 입력" value="form" />
          </TabList>
        </Box>
        <TabPanel value="upload">
          <UploadForm />
        </TabPanel>
        <TabPanel value="form">
          <InputForm />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default TabContent;
