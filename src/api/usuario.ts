import apiClient from "../services/api";

export const getUsuarioById = async (id: number) => {
  const response = await apiClient.get(`/usuarios/${id}`);
  return response.data;
};
