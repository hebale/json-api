// @ts-nocheck
import React, { useState, useEffect, ReactElement } from "react";

import InfoTitle from "./InfoTitle";
import InfoControl from "./InfoControl";

type ApiTableType = {
  name: string;
  children: any;
};

const ApiTable = ({
  method,
  apiName,
  description,
  children,
}: ApiTableType): JSX.Element => {
  return (
    <>
      <InfoTitle {...{ method, apiName }} />
      <InfoControl {...{ description }} />
    </>
  );
};

export default ApiTable;
