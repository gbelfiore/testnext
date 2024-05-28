import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios";
import axiosRetry, { type IAxiosRetryConfig } from "axios-retry";

import {
  type IHttpServiceConstructor,
  type IRequestInterceptor,
  type IResponseInterceptor,
  type TInterceptors,
} from "~/utilities/http-service/typings";

class HttpService {
  private _http?: AxiosInstance;
  private requestConfig?: AxiosRequestConfig;
  private allowedRetryCodes = [408, 500, 502, 503, 504, 522, 524];
  private axiosRetryConfig?: IAxiosRetryConfig = {
    retries: 3,
    retryDelay: (retryCount: number) => retryCount * 300,
    retryCondition: (error: AxiosError) =>
      this.allowedRetryCodes.includes(error.response?.status ?? 0),
  };
  private interceptors: TInterceptors = {
    request: [],
    response: [],
  };

  constructor({
    requestConfig,
    axiosRetryConfig,
    interceptors,
  }: IHttpServiceConstructor) {
    this.requestConfig = requestConfig;
    this.axiosRetryConfig = axiosRetryConfig ?? this.axiosRetryConfig;
    this.interceptors = interceptors ?? this.interceptors;

    this.initializeClient();
    this.initializeInterceptors();
  }

  public get http(): AxiosInstance | undefined {
    return this._http;
  }

  private initializeClient(): void {
    const { adapter } = axios.defaults;
    if (adapter) {
      this._http = axios.create(this.requestConfig);
      axiosRetry(this._http, this.axiosRetryConfig);
    }
  }

  private initializeInterceptors(): void {
    if (this.interceptors.request.length > 0) {
      this.interceptors.request.forEach((interceptor: IRequestInterceptor) =>
        this.addRequestInterceptor(interceptor)
      );
    }
    if (this.interceptors.response.length > 0) {
      this.interceptors.response.forEach((interceptor: IResponseInterceptor) =>
        this.addResponseInterceptor(interceptor)
      );
    }
  }

  public getRequestInterceptor(name: string): IRequestInterceptor | undefined {
    return this.interceptors.request.find(
      (interceptor: IRequestInterceptor) => interceptor.name === name
    );
  }

  public addRequestInterceptor(interceptor: IRequestInterceptor) {
    if (this.http) {
      const instance = this.http.interceptors.request.use(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        interceptor.onFulfilled?.bind(this),
        interceptor.onRejected?.bind(this),
        interceptor.options
      );
      const requestInterceptor = this.getRequestInterceptor(interceptor.name);
      if (requestInterceptor) {
        requestInterceptor.instance = instance;
      } else {
        this.interceptors.request.push({
          ...interceptor,
          instance,
        });
      }
    }
  }

  public removeRequestInterceptor(name: string) {
    const requestInterceptor = this.getRequestInterceptor(name);
    if (requestInterceptor?.instance) {
      this.http?.interceptors.request.eject(requestInterceptor.instance);
      this.interceptors.request = this.interceptors.request.filter(
        (interceptor: IRequestInterceptor) => interceptor.name !== name
      );
    }
  }

  public getResponseInterceptor(
    name: string
  ): IResponseInterceptor | undefined {
    return this.interceptors.response.find(
      (interceptor: IResponseInterceptor) => interceptor.name === name
    );
  }

  public addResponseInterceptor(interceptor: IResponseInterceptor) {
    if (this.http) {
      const instance = this.http.interceptors.response.use(
        interceptor.onFulfilled?.bind(this),
        interceptor.onRejected?.bind(this),
        interceptor.options
      );
      const responseInterceptor = this.getResponseInterceptor(interceptor.name);
      if (responseInterceptor) {
        responseInterceptor.instance = instance;
      } else {
        this.interceptors.response.push({
          ...interceptor,
          instance,
        });
      }
    }
  }

  public removeResponseInterceptor(name: string) {
    const responseInterceptor = this.getResponseInterceptor(name);
    if (responseInterceptor?.instance) {
      this.http?.interceptors.response.eject(responseInterceptor.instance);
      this.interceptors.response = this.interceptors.response.filter(
        (interceptor: IResponseInterceptor) => interceptor.name !== name
      );
    }
  }

  static isValidHttpUrl(uri: string) {
    let url;

    try {
      url = new URL(uri);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }
}

export { HttpService };
