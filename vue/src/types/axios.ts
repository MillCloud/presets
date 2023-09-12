import type { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

type IAxiosShowErrorType_ = 'dialog' | 'message' | 'notification';

interface IAxiosResponseData_ {
  success: boolean;
  code: string;
  message: string;
  [key: string]: any;
}

interface IAxiosRequestConfig_<D = any> extends AxiosRequestConfig<D> {
  showError?: boolean;
  showErrorType?: IAxiosShowErrorType_;
}

interface IAxiosResponse_<T = IAxiosResponseData_, D = any> extends AxiosResponse<T, D> {}

type IAxiosPromise_<T = IAxiosResponseData_, D = any> = Promise<IAxiosResponse_<T, D>>;

interface IAxiosError_<T = IAxiosResponseData_, D = any> extends AxiosError<T, D> {
  response?: IAxiosResponse_<T, D>;
}

export type {
  IAxiosShowErrorType_ as IAxiosShowErrorType,
  IAxiosResponseData_ as IAxiosResponseData,
  IAxiosRequestConfig_ as IAxiosRequestConfig,
  IAxiosResponse_ as IAxiosResponse,
  IAxiosPromise_ as IAxiosPromise,
  IAxiosError_ as IAxiosError,
};

declare global {
  type IAxiosShowErrorType = IAxiosShowErrorType_;
  interface IAxiosResponseData extends IAxiosResponseData_ {}
  interface IAxiosRequestConfig<D = any> extends IAxiosRequestConfig_<D> {}
  interface IAxiosResponse<T = IAxiosResponseData_, D = any> extends IAxiosResponse_<T, D> {}
  type IAxiosPromise<T = IAxiosResponseData_, D = any> = IAxiosPromise_<T, D>;
  interface IAxiosError<T = IAxiosResponseData_, D = any> extends IAxiosError_<T, D> {}
}
