import type { UnError, UnResponse, UnConfig } from '@uni-helper/uni-network';

type _IUnShowErrorType = 'toast' | 'modal';

interface _IUnRequestData {
  [key: string]: any;
}

interface _IUnResponseData {
  success: boolean;
  code: string;
  message: string;
  [key: string]: any;
}

interface _IUnConfig<T = _IUnResponseData, D = _IUnRequestData> extends UnConfig<T, D> {
  showError?: boolean;
  showErrorType?: _IUnShowErrorType;
}
interface _IUnResponse<T = _IUnResponseData, D = _IUnRequestData> extends UnResponse<T, D> {}

type _IUnPromise<T = _IUnResponseData, D = _IUnRequestData> = Promise<_IUnResponse<T, D>>;

interface _IUnError<T = _IUnResponseData, D = _IUnRequestData> extends UnError<T, D> {
  response?: _IUnResponse<T, D>;
}

export type {
  _IUnShowErrorType as IUnShowErrorType,
  _IUnRequestData as IUnRequestData,
  _IUnResponseData as IUnResponseData,
  _IUnConfig as IUnConfig,
  _IUnResponse as IUnResponse,
  _IUnPromise as IUnPromise,
  _IUnError as IUnError,
};

declare global {
  type IUnShowErrorType = _IUnShowErrorType;
  interface IUnRequestData extends _IUnRequestData {}
  interface IUnResponseData extends _IUnResponseData {}
  interface IUnConfig<T = _IUnResponseData, D = _IUnRequestData> extends _IUnConfig<T, D> {}
  interface IUnResponse<T = _IUnResponseData, D = _IUnRequestData> extends _IUnResponse<T, D> {}
  type IUnPromise<T = _IUnResponseData, D = _IUnRequestData> = _IUnPromise<T, D>;
  interface IUnError<T = _IUnResponseData, D = _IUnRequestData> extends _IUnError<T, D> {}
}
