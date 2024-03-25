import http from "./http";

type ApiProps = {
  name?: string;
  data?: string;
};

type ApiInterface = (props: ApiProps) => {
  code: number;
  message?: string;
};

export const getAllJsons = async () => {
  const response = await http.get({ path: "/api/v1/all-jsons" });
  if (response?.code === 200) return response;
};

export const updateJsonData = async ({ name, data }) => {
  const response = await http.patch({
    path: "/api/v1/update-data",
    body: { name, data },
  });

  if (response?.code === 200) return response;
};
