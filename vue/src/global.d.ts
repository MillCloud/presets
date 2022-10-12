import type { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';

declare global {
  type IAxiosShowErrorType = 'alert' | 'message' | 'notification';
  interface IAxiosResponseData {
    success: boolean;
    code: string;
    message: string;
    [key: string]: any;
  }
  interface IAxiosResponse extends AxiosResponse<IAxiosResponseData> {}
  interface IAxiosResponseError extends AxiosError<IAxiosResponseData> {
    response?: IAxiosResponse;
  }
  interface IAxiosRequestConfig extends AxiosRequestConfig {
    showError?: boolean;
    showErrorType?: IAxiosShowErrorType;
  }
}

export {};
