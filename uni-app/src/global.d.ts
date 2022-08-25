import type {
  UrError,
  UrBaseResponse,
  UrRequestResponse,
  UrDownloadResponse,
  UrUploadResponse,
  UrBaseConfig,
  UrRequestConfig,
  UrDownloadConfig,
  UrUploadConfig,
} from '@modyqyw/uni-request';

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
  interface IBaseConfig<T = TResponseData, D = TRequestData> extends UrBaseConfig<T, D> {
    showError?: boolean;
    showErrorType?: TShowErrorType;
  }

  interface IRequestConfig<T = TResponseData, D = TRequestData>
    extends UrRequestConfig<T, D>,
      IBaseConfig<T, D> {}

  interface IDownloadConfig<T = TResponseData, D = TRequestData>
    extends UrDownloadConfig<T, D>,
      IBaseConfig<T, D> {}

  interface IUploadConfig<T = TResponseData, D = TRequestData>
    extends UrUploadConfig<T, D>,
      IBaseConfig<T, D> {}

  type TConfig =
    | IBaseConfig<T, D>
    | IRequestConfig<T, D>
    | IDownloadConfig<T, D>
    | IUploadConfig<T, D>;

  /* response */
  interface IBaseResponse<T = TResponseData, D = TRequestData> extends UrBaseResponse<T, D> {}

  interface IRequestResponse<T = TResponseData, D = TRequestData>
    extends UrRequestResponse<T, D>,
      IBaseResponse<T, D> {}

  interface IDownloadResponse<T = TResponseData, D = TRequestData>
    extends UrDownloadResponse<T, D>,
      IBaseResponse<T, D> {}

  interface IUploadResponse<T = TResponseData, D = TRequestData>
    extends UrUploadResponse<T, D>,
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
  interface IBaseError<T = TResponseData, D = TRequestData> extends UrError<T, D> {
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
