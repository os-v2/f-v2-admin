import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  AsyncStorage.getItem("token").then(token => {
    if (token) {
      config.headers.setAuthorization(token);
    }
  });

  console.info(
    `[request] \n baseUrl : [${config.baseURL}]\n url : [${
      config.url
    }] \n Accept : [${config.headers.Accept}] ${
      config.headers.Authorization
        ? `\nAuthorization : [${config.headers.Authorization}]`
        : ""
    }\n data : [${config.data}]\n method : [${
      config.method
    }]\n ContentType : [${config.headers["Content-Type"]}]`,
  );

  return config;
};
const onRequestError = (error: AxiosError): Promise<AxiosError> =>
  // console.error(`[request error] [${JSON.stringify(error)}]`);
  Promise.reject(error);
const onResponse = (response: AxiosResponse): AxiosResponse => {
  // console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
};
const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};
export default function setupInterceptorsTo(
  axiosInstance: AxiosInstance,
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
