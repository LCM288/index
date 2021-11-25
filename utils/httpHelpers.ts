import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const post = <T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>
): Promise<R> => {
  return axios.post(url, data, config);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const get = <T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  config?: AxiosRequestConfig<D>
): Promise<R> => {
  return axios.get(url, config);
};
