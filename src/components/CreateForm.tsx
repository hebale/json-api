import React from "react";
import {
  FormGroup,
  FormControl,
  OutlinedInput,
  InputLabel,
} from "@mui/material";

import CodeEditor from "@Components/CodeEditor";

const CreateForm = () => {
  return (
    <>
      <FormGroup>
        <FormControl size="small">
          <InputLabel>path</InputLabel>
          <OutlinedInput label="path" />
        </FormControl>
        <FormControl size="small">
          <InputLabel>method</InputLabel>
          <OutlinedInput label="method" />
        </FormControl>
      </FormGroup>
      <CodeEditor data="" />
    </>
  );
};

export default CreateForm;
