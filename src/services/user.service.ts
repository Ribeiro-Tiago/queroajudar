import { axios } from "boot/axios";

export const login = async (email: string, password: string) => {
  return await axios.post("/v1/login", { email, password });
};

export const register = async (email: string, password: string) => {
  return await axios.post("/v1/register", { email, password });
};
