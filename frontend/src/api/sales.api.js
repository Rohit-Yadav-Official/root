import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3034/api",
});

export const getSales = async (filters = {}) => {
  const response = await API.post("/sales/filter", filters);
  return response.data;
};
