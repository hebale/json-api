import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import ApiListItem from "~/components/ApiListItem";
import { getAllJsons } from "~/api";

const Body = () => {
  const [datas, setDatas] = useState<{ [key: string]: any }[] | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await getAllJsons();

      if (data) setDatas(data);
    })();
  }, []);

  return (
    <Box>
      {datas &&
        datas.map((data) => {
          return <></>;
          <ApiListItem {...data} />;
        })}
    </Box>
  );
};

export default Body;
