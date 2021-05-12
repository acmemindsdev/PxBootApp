import { AxiosRequestConfig } from "axios";

export const requestInterceptor = async (config: AxiosRequestConfig) => {
    return config;
};
