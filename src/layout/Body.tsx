import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import ApiListItem from "~/components/ApiListItem";
import { getAllJsons } from "~/api";

import Monaco from "~/features/Monaco";
import schemas from "~/schema";

const json = {
  apiPath: "/",
  headers: {
    "Content-Type": "application/json",
  },
  methods: [
    {
      method: "POST",
      delay: 100,
      status: 500,
    },
    {
      method: "GET",
      delay: 600,
      status: 200,
    },
  ],
  response: {
    변경테스트: true,
    date: "2024-03-25",
    detail: "변경되었습니다",
    test: true,
  },
};

const Body = () => {
  const [datas, setDatas] = useState<{ [key: string]: any }[] | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await getAllJsons();
      if (data) setDatas(data);
    })();
  }, []);

  const onValidate = (makers) => {
    console.log(makers);
  };

  return (
    <Box>
      {datas &&
        datas.map((data) => (
          <React.Fragment key={data.apiPath}>
            <ApiListItem {...data} />
          </React.Fragment>
        ))}
      {/* <Monaco
        value={JSON.stringify(json)}
        height={600}
        schemas={schemas}
        onChange={(data) => console.log(data)}
        onValidate={onValidate}
      /> */}
    </Box>
  );
};

export default Body;
