import type {
  UanError,
  UanBaseResponse,
  UanRequestResponse,
  UanDownloadResponse,
  UanUploadResponse,
  UanBaseConfig,
  UanRequestConfig,
  UanDownloadConfig,
  UanUploadConfig,
} from 'uni-app-network';

declare global {
  /* common */
  type TShowErrorType = 'toast' | 'modal';

  type TRequestData = Record<string, any>;

  type TResponseData = {
    success: boolean;
    code: string;
    message: string;
    [key: string]: any;
  };

  /* config */
  interface IBaseConfig<T = TResponseData, D = TRequestData> extends UanBaseConfig<T, D> {
    showError?: boolean;
    showErrorType?: TShowErrorType;
  }

  interface IRequestConfig<T = TResponseData, D = TRequestData>
    extends UanRequestConfig<T, D>,
      IBaseConfig<T, D> {}

  interface IDownloadConfig<T = TResponseData, D = TRequestData>
    extends UanDownloadConfig<T, D>,
      IBaseConfig<T, D> {}

  interface IUploadConfig<T = TResponseData, D = TRequestData>
    extends UanUploadConfig<T, D>,
      IBaseConfig<T, D> {}

  type TConfig =
    | IBaseConfig<T, D>
    | IRequestConfig<T, D>
    | IDownloadConfig<T, D>
    | IUploadConfig<T, D>;

  /* response */
  interface IBaseResponse<T = TResponseData, D = TRequestData> extends UanBaseResponse<T, D> {}

  interface IRequestResponse<T = TResponseData, D = TRequestData>
    extends UanRequestResponse<T, D>,
      IBaseResponse<T, D> {}

  interface IDownloadResponse<T = TResponseData, D = TRequestData>
    extends UanDownloadResponse<T, D>,
      IBaseResponse<T, D> {}

  interface IUploadResponse<T = TResponseData, D = TRequestData>
    extends UanUploadResponse<T, D>,
      IBaseResponse<T, D> {}

  type TResponse =
    | IBaseResponse<T, D>
    | IRequestResponse<T, D>
    | IDownloadResponse<T, D>
    | IUploadResponse<T, D>;

  /* promise */
  type TBasePromise<T = TResponseData, D = TRequestData> = Promise<IBaseResponse<T, D>>;

  type TRequestPromise<T = TResponseData, D = TRequestData> = Promise<IRequestResponse<T, D>>;

  type TDownloadPromise<T = TResponseData, D = TRequestData> = Promise<IDownloadResponse<T, D>>;

  type TUploadPromise<T = TResponseData, D = TRequestData> = Promise<IUploadResponse<T, D>>;

  type TPromise<T = TResponseData, D = TRequestData> =
    | TBasePromise<T, D>
    | TRequestPromise<T, D>
    | TDownloadPromise<T, D>
    | TUploadPromise<T, D>;

  /* error */
  interface IBaseError<T = TResponseData, D = TRequestData> extends UanError<T, D> {
    response?: IBaseResponse<T, D>;
  }

  interface IRequestError<T = TResponseData, D = TRequestData> extends IBaseError<T, D> {}

  interface IDownloadError<T = TResponseData, D = TRequestData> extends IBaseError<T, D> {}

  interface IUploadError<T = TResponseData, D = TRequestData> extends IBaseError<T, D> {}

  type TError<T = TResponseData, D = TRequestData> =
    | IBaseError<T, D>
    | IRequestConfig<T, D>
    | IDownloadConfig<T, D>
    | IUploadConfig<T, D>;
}

export {};
