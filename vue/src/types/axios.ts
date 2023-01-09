import type { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

type _IAxiosShowErrorType = 'alert' | 'message' | 'notification';

interface _IAxiosResponseData {
  success: boolean;
  code: string;
  message: string;
  [key: string]: any;
}

interface _IAxiosRequestConfig<D = any> extends AxiosRequestConfig<D> {
  showError?: boolean;
  showErrorType?: _IAxiosShowErrorType;
}

interface _IAxiosResponse<T = _IAxiosResponseData, D = any> extends AxiosResponse<T, D> {}

type _IAxiosPromise<T = _IAxiosResponseData, D = any> = Promise<_IAxiosResponse<T, D>>;

interface _IAxiosError<T = _IAxiosResponseData, D = any> extends AxiosError<T, D> {
  response?: _IAxiosResponse<T, D>;
}

export type {
  _IAxiosShowErrorType as IAxiosShowErrorType,
  _IAxiosResponseData as IAxiosResponseData,
  _IAxiosRequestConfig as IAxiosRequestConfig,
  _IAxiosResponse as IAxiosResponse,
  _IAxiosPromise as IAxiosPromise,
  _IAxiosError as IAxiosError,
};

declare global {
  type IAxiosShowErrorType = _IAxiosShowErrorType;
  interface IAxiosResponseData extends _IAxiosResponseData {}
  interface IAxiosRequestConfig<D = any> extends _IAxiosRequestConfig<D> {}
  interface IAxiosResponse<T = _IAxiosResponseData, D = any> extends _IAxiosResponse<T, D> {}
  type IAxiosPromise<T = _IAxiosResponseData, D = any> = _IAxiosPromise<T, D>;
  interface IAxiosError<T = _IAxiosResponseData, D = any> extends _IAxiosError<T, D> {}
}
