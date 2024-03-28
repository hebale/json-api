import http from "./http";

export const getAllJsons = async () => {
  const response = await http.get("/api/v1/all");
  if (response?.code === 200) return response;
};

export const getJson = async (params: string) => {
  const response = await http.get(`/api/v1/json?apiPath=${params}`);
  if (response?.code === 200) return response;
};

export const postJsonData = async (params: any) => {
  const response = await http.patch("/api/v1/json", { body: params });
  if (response?.code === 200) return response;
};

export const putJsonData = async (params: any) => {
  const response = await http.put("/api/v1/json", { body: params });
  if (response?.code === 200) return response;
};

export const patchJsonData = async (params: any) => {
  const response = await http.patch("/api/v1/json/response", { body: params });
  if (response?.code === 200) return response;
};

export const patchJsonMethods = async (params: any) => {
  const response = await http.patch("/api/v1/json/methods", { body: params });
  if (response?.code === 200) return response;
};

export const deleteJson = async (params: any) => {
  const response = await http.delete(`/api/v1/json`, { body: params });
  if (response?.code === 200) return response;
};
