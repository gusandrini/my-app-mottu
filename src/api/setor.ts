import apiClient from "../services/api";

export const getSetores = async () => {
  const response = await apiClient.get("/setores");
  return response.data;
};

export const getSetorById = async (id: number) => {
  const response = await apiClient.get(`/setores/${id}`);
  return response.data;
};

export const createSetor = async (setor: { nome: string; descricao?: string }) => {
  const response = await apiClient.post("/setores", setor);
  return response.data;
};

export const updateSetor = async (id: number, setor: { nome: string; descricao?: string }) => {
  const response = await apiClient.put(`/setores/${id}`, setor);
  return response.data;
};

export const deleteSetor = async (id: number) => {
  await apiClient.delete(`/setores/${id}`);
};

export const getSetorByPlaca = async (placa: string) => {
  const response = await apiClient.get(`/setores/por-placa/${placa}`);
  return response.data;
};

export const getSetorByIot = async (iotId: number) => {
  const response = await apiClient.get(`/setores/por-iot/${iotId}`);
  return response.data;
};
