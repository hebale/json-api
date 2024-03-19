import React, { createContext } from "react";

import ListHead from "./ListHead";
import ListBody from "./ListBody";

type ConfigType = {
  key: string;
  align?: string;
  width?: number;
};

const config: ConfigType[] = [
  { key: "method", align: "left" },
  { key: "delay", align: "center", width: 80 },
  { key: "status", align: "center", width: 80 },
];

export const ConfigContext = createContext<ConfigType[]>(config);

const ListContainer = () => {
  return (
    <ConfigContext.Provider value={config}>
      {/* <ListHead /> */}
      <ListBody />
    </ConfigContext.Provider>
  );
};

export default ListContainer;
