import type { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import type { ElForm, ElTable } from 'element-plus';

declare global {
  type ElFormInstance = InstanceType<typeof ElForm>;
  type ElTableInstance = InstanceType<typeof ElTable>;

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
