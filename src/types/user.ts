export type UserType = "org" | "volunteer";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  type: UserType;
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
}
