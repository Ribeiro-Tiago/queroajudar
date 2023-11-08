import { defineStore } from "pinia";

import { User } from "src/types/user";

interface UserState {
  _user: User | null;
}

const initUserVal = () => {
  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;
};

export const useSessionStore = defineStore("session", {
  state: (): UserState => ({
    _user: initUserVal(),
  }),
  getters: {
    user: (state) => state._user,
  },
  actions: {
    setUser(user: User) {
      this._user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
  },
});
