/* eslint-disable */
export {};

declare module "axios" {
  export interface AxiosResponse<T = any, D = any> extends Promise<T> {}
}
