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
        datas.map((data) => (
          <React.Fragment key={data.name}>
            <ApiListItem {...data} />
          </React.Fragment>
        ))}
    </Box>
  );
};

export default Body;
