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
  interface IUanConfig<T = ResponseData, D = RequestData> extends UanConfig<T, D> {
    showError?: boolean;
    showErrorType?: ShowErrorType;
  }
  interface IUanResponse<T = ResponseData, D = RequestData> extends UanResponse<T, D> {}
  type IUanPromise<T = TResponseData, D = TRequestData> = Promise<IUanResponse<T, D>>;
  interface IUanError<T = ResponseData, D = RequestData> extends UanError<T, D> {
    response?: IUanResponse<T, D>;
  }
}

export {};
