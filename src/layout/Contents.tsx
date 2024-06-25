import React from 'react';
import { Grid, Paper, Stack, Box } from '@mui/material';
import type { ReactElement } from 'react';

export type ContentsProps = {
  ribbon?: ReactElement;
  items?: item[];
};

export type item = {
  key: string;
  component: ReactElement;
};

const Contents = ({ ribbon, items }: ContentsProps) => {
  return (
    <Stack id="contents" component="section">
      {ribbon && <Box>{ribbon}</Box>}
      <Grid spacing={2} container>
        {items && items.length > 0 ? (
          items.map(({ key, component }) => (
            <Grid key={key} lg={12 / items.length} item>
              <Paper className="paper-box" elevation={2}>
                {component}
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid lg={12} item>
            메뉴를 선택해주세요.
          </Grid>
        )}
      </Grid>
    </Stack>
  );
};

export default Contents;
