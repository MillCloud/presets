declare global {
  interface IResponseData {
    success: boolean;
    code: string;
    message: string;
    [propName: string]: any;
  }

  type BaseRequestHeaders = Record<string, string | number | boolean>;

  type BaseResponseHeaders = Record<string, string> & {
    'set-cookie'?: string[];
  };

  type BaseData = string | AnyObject | ArrayBuffer;

  interface BaseRequestConfig<D = BaseData>
    extends Omit<UniApp.RequestOptions, 'success' | 'fail' | 'complete'> {
    url?: string;
    data?: D;
    params?: string | AnyObject;
    headers?: BaseRequestHeaders;
  }

  type BaseResponse<T = BaseData, D = BaseData> = UniApp.RequestSuccessCallbackResult & {
    data: T;
    status?: number;
    statusText?: string;
    headers?: BaseResponseHeaders;
    config?: BaseRequestConfig<D>;
    request?: any;
  };

  type BaseError<T = BaseData, D = BaseData> = UniApp.GeneralCallbackResult & {
    config?: BaseRequestConfig<D>;
    code?: string;
    request?: any;
    response?: BaseResponse<T, D>;
  };

  interface IResponse extends BaseResponse<IResponseData> {}

  interface IResponseError extends BaseError<IResponseData> {
    response?: IResponse;
  }

  interface IRequestConfig extends BaseRequestConfig {
    showError?: boolean;
    showErrorType?: 'toast' | 'modal';
  }
}

export {};
