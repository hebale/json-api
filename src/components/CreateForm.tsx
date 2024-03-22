import React from "react";
import {
  FormGroup,
  FormControl,
  OutlinedInput,
  InputLabel,
} from "@mui/material";

import CodeEditor from "~/components/CodeEditor";

const CreateForm = () => {
  return (
    <>
      <FormGroup>
        <FormControl size="small">
          <InputLabel>path</InputLabel>
          <OutlinedInput label="path" value={"/user/info"} />
        </FormControl>
        <FormControl size="small">
          <InputLabel>method</InputLabel>
          <OutlinedInput label="method" />
        </FormControl>
      </FormGroup>
      <CodeEditor
        data={`{
          "name": "윤종규",
          "age": 32,
          "data": false 
        }`}
      />
    </>
  );
};

export default CreateForm;
