import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import ApiListItem from "~/components/ApiListItem";
import { getAllJsons } from "~/api";

import Viewer from "~/features/Viewer";
import Contents from "~/dialog/EditPipeline/Contents";

const defaultJs = `function pipeline(request, response) {\n  const { query, body} = request;\n  // code goes here\n\n\n  return response;\n}`;


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
    <>  
      {/* <Contents path='/data' value={defaultJs} /> */}
      <Box>
        {datas &&
          datas.map((data) => (
            <React.Fragment key={data.path}>
              <ApiListItem {...data} />
            </React.Fragment>
          ))}
      </Box>
    </>
  );
};

export default Body;
