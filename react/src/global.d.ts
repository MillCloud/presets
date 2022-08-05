import type { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';

declare global {
  type TShowErrorType = 'modal' | 'message' | 'notification';

  interface IResponseData {
    success: boolean;
    code: string;
    message: string;
    [key: string]: any;
  }

  interface IResponse extends AxiosResponse<IResponseData> {}

  interface IResponseError extends AxiosError<IResponseData> {
    response?: IResponse;
  }

  interface IRequestConfig extends AxiosRequestConfig {
    showError?: boolean;
    showErrorType?: TShowErrorType;
  }
}

export {};
