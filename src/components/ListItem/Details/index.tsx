import React, { useState } from 'react';
import { AccordionDetails, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import Headers from './Headers';
import Methods from './Methods';
import Response from './Response';

const tabConfig = [
  {
    label: 'headers',
    component: <Headers />,
  },
  {
    label: 'methods',
    component: <Methods />,
  },
  {
    label: 'response',
    component: <Response />,
  },
];

const Details = () => {
  const [tabValue, setTabValue] = useState('methods');

  return (
    <AccordionDetails>
      <TabContext value={tabValue}>
        <TabList onChange={(e, value) => setTabValue(value)}>
          {tabConfig.map((config) => (
            <Tab key={config.label} label={config.label} value={config.label} />
          ))}
        </TabList>
        {tabConfig.map((config) => (
          <TabPanel key={config.label} value={config.label}>
            {config.component}
          </TabPanel>
        ))}
      </TabContext>
    </AccordionDetails>
  );
};

export default Details;
