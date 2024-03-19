import React from "react";
import ApiListItem from "../ApiListItem";

type DataType = {
  path: string;
  methods: string[];
  delay: number[];
  status: number[];
  data: string;
};

const datas: DataType[] = [
  {
    path: "/user",
    methods: ["POST", "GET"],
    delay: [0, 100, 200, 0],
    status: [200, 401, 403, 500],
    data: `{
      "bool": false,
    }`,
  },
  {
    path: "/admin",
    methods: ["POST", "GET", "PATCH", "DELETE"],
    delay: [100, 200, 0, 0],
    status: [200, 401, 403, 500],
    data: `{
      "bool": true,
    }`,
  },
];

const ApiListGroup = () => {
  return datas.map((data) => <ApiListItem key={data.path} {...data} />);
};

export default ApiListGroup;
