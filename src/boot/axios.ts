import { boot } from "quasar/wrappers";
import Axios, { AxiosInstance, AxiosStatic } from "axios";

import { version } from "../../package.json";
import { AxiosError } from "src/exceptions";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosStatic;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const axios = Axios.create({
  baseURL: `${process.env.API}`,
  headers: { "Content-Type": "application/json" },
});

export default boot(({ app }) => {
  // request
  axios.interceptors.request.use((req) => {
    // attach token to requests
    // req.headers.Authorization = `Bearer ${Vue.prototype.$keycloak.token}`;

    req.headers["X-Version"] = version;

    return req;
  }, Promise.reject);

  // response
  axios.interceptors.response.use(
    ({ data }) => data,
    async (error) => {
      if (process.env.NODE_ENV === "local") {
        console.log(error, error.response);
      }

      // un unexpected error ocurred
      if (!error.response) {
        return Promise.reject(error);
      }

      const { data, status } = error.response;

      // not authenticated
      if (status === 401) {
        return app.config.globalProperties.$router.replace("login");
      }

      // no permissions for action
      if (status === 403) {
        // todo: handle this case
        console.error("no permissions");
        return;
      }

      return Promise.reject(new AxiosError(data.reason, status, data.errors));
    }
  );

  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = Axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = axios;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { axios };
