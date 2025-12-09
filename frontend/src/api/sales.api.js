import axios from "axios";

const API = axios.create({
  baseURL: "https://root-production-88c0.up.railway.app/api",
});

export const getSales = async (filters = {}) => {
  const response = await API.post("/sales/filter", filters);
  return response.data;
};
