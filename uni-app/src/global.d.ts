import type { UanError, UanResponse, UanConfig } from 'uni-app-network';

declare global {
  /** uni-app-network */
  type IUanShowErrorType = 'toast' | 'modal';
  interface IUanRequestData {
    [key: string]: any;
  }
  interface IUanResponseData {
    success: boolean;
    code: string;
    message: string;
    [key: string]: any;
  }
  interface IUanConfig<T = IUanResponseData, D = IUanRequestData> extends UanConfig<T, D> {
    showError?: boolean;
    showErrorType?: ShowErrorType;
  }
  interface IUanResponse<T = IUanResponseData, D = IUanRequestData> extends UanResponse<T, D> {}
  type IUanPromise<T = IUanResponseData, D = IUanRequestData> = Promise<IUanResponse<T, D>>;
  interface IUanError<T = IUanResponseData, D = IUanRequestData> extends UanError<T, D> {
    response?: IUanResponse<T, D>;
  }
}

export {};
