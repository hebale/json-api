import http from "./http";

export const getAllJsons = async () => {
  const response = await http.get("/api/v1/all-jsons");
  if (response?.code === 200) return response;
};

export const updateJsonData = async (params: any) => {
  const response = await http.patch("/api/v1/update-data", { body: params });
  if (response?.code === 200) return response;
};

export const updateJsonMethod = async (params: any) => {
  const response = await http.patch("/api/v1/update-method", { body: params });
  if (response?.code === 200) return response;
};
