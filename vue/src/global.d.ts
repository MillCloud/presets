import type { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';

declare global {
  interface IResponseData {
    success: boolean;
    code: string;
    message: string;
    [propName: string]: any;
  }

  interface IResponse extends AxiosResponse<IResponseData> {}

  interface IResponseError extends AxiosError<IResponseData> {
    response?: IResponse;
  }

  interface IRequestConfig extends AxiosRequestConfig {
    showError?: boolean;
    showErrorType?: 'alert' | 'message' | 'notification';
  }
}

export {};
