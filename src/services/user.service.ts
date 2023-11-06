import { axios } from "boot/axios";

export const login = async (email: string, password: string) => {
  return await axios.post("login", { email, password });
};

export const register = async (email: string, password: string) => {
  return await axios.post("register", { email, password });
};
