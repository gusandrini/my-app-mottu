import apiClient from "../services/api"; 

export const getMotos = async () => {
  const response = await apiClient.get("/motos");
  return response.data;
};

export const getMotoById = async (id: number) => {
  const response = await apiClient.get(`/motos/${id}`);
  return response.data;
};

export const createMoto = async (moto: {
  modelo: string;
  ano: number;
  placa: string;
  setor?: { id: number };
}) => {
  const response = await apiClient.post("/motos", moto);
  return response.data;
};

export const updateMoto = async (id: number, moto: {
  modelo: string;
  ano: number;
  placa: string;
  setor?: { id: number };
}) => {
  const response = await apiClient.put(`/motos/${id}`, moto);
  return response.data;
};

export const deleteMoto = async (id: number) => {
  await apiClient.delete(`/motos/${id}`);
};
