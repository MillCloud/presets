import type { UnError, UnResponse, UnConfig } from '@uni-helper/uni-network';

declare global {
  /** @uni-helper/uni-network */
  type IUnShowErrorType = 'toast' | 'modal';
  interface IUnRequestData {
    [key: string]: any;
  }
  interface IUnResponseData {
    success: boolean;
    code: string;
    message: string;
    [key: string]: any;
  }
  interface IUnConfig<T = IUnResponseData, D = IUnRequestData> extends UnConfig<T, D> {
    showError?: boolean;
    showErrorType?: ShowErrorType;
  }
  interface IUnResponse<T = IUnResponseData, D = IUnRequestData> extends UnResponse<T, D> {}
  type IUnPromise<T = IUnResponseData, D = IUnRequestData> = Promise<IUnResponse<T, D>>;
  interface IUnError<T = IUnResponseData, D = IUnRequestData> extends UnError<T, D> {
    response?: IUnResponse<T, D>;
  }
}

export {};
