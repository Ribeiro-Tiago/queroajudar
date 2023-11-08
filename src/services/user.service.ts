import { axios } from "boot/axios";
import { User, RegisterPayload } from "src/types/user";

export const login = async (email: string, password: string) => {
  return await axios.post<User>("login", { email, password });
};

export const register = async (payload: RegisterPayload) => {
  return await axios.post<User>("register", payload);
};

export const logout = async () => await axios.delete("logout");
