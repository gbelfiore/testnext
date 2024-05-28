import {
  AxiosInterceptorOptions,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

type TOnRejected = (error: any) => any;
type TOnRequestFulfilled = (
  value: AxiosRequestConfig<any>
) => AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>>;
type TOnResponseFulfilled = (
  value: AxiosResponse<any>
) => AxiosResponse<any> | Promise<AxiosResponse<any>>;

interface IInterceptor {
  name: string;
  instance?: number;
}

interface IRequestInterceptor extends IInterceptor {
  onFulfilled?: TOnRequestFulfilled;
  onRejected?: TOnRejected;
  options?: AxiosInterceptorOptions;
}

interface IResponseInterceptor extends IInterceptor {
  onFulfilled?: TOnResponseFulfilled;
  onRejected?: TOnRejected;
  options?: AxiosInterceptorOptions;
}

type TInterceptors = {
  request: IRequestInterceptor[];
  response: IResponseInterceptor[];
};

interface IHttpServiceConstructor {
  requestConfig?: AxiosRequestConfig;
  axiosRetryConfig?: IAxiosRetryConfig;
  interceptors?: TInterceptors;
}

export {
  IRequestInterceptor,
  IResponseInterceptor,
  TOnRejected,
  TOnRequestFulfilled,
  TOnResponseFulfilled,
  TInterceptors,
  IInterceptor,
  IHttpServiceConstructor,
};