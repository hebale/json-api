import http from "./http";

export const getAllJsons = async () => {
  const data = await http.get({ path: "/api/v1/all-jsons" });
  if (data?.code === 200) return data;
};
