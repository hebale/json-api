import React, { useState, useEffect } from 'react';
import {
  Paper,
  FormGroup,
  FormLabel,
  FormControl,
  Select,
  Checkbox,
  Typography,
} from '@mui/material';

import Code from './Code';
import Output from './Output';

const PipelineBox = () => {
  const [code, setCode] = useState('');

  return (
    <Paper elevation={2} sx={{ p: 1 }}>
      <Typography variant="subtitle1" component="p">
        PIPELINE
      </Typography>
      <Code />
      <Output />
    </Paper>
  );
};

export default PipelineBox;
