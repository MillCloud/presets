import axios from 'axios';
import { Modal, message, notification } from 'antd';
import qs from 'qs';
import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { Headers } from '@/constants';
import { getToken, setToken } from './storage';

const reSignInCodes = new Set(['LOGIN_REQUIRED', 'LOGIN_TOKEN_INVALID', 'LOGIN_SESSION_EXPIRED']);

const instance = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_BASE_URL || 'https://jsonplaceholder.typicode.com/',
  timeout: 30_000,
  headers: {
    ...Headers,
  },
  paramsSerializer: (params: any) =>
    qs.stringify(
      Object.fromEntries(
        Object.entries(params).filter(
          ([, v]) =>
            !['', 'undefined', 'null', undefined, null].includes((v as any)?.toString() ?? v),
        ),
      ),
    ),
});
instance.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    token: getToken(),
    'X-Token': getToken(),
    'X-Access-Token': getToken(),
  },
}));

export { instance as axiosInstance };

let hasModal = false;
export const showError = ({
  response,
  error,
  showErrorType = 'modal',
}: {
  response?: IResponse;
  error?: IResponseError;
  showErrorType?: TShowErrorType;
} = {}) => {
  // url
  const url =
    error?.config?.url ??
    error?.request?.url ??
    // @ts-ignore
    error?.url ??
    response?.config?.url ??
    response?.request?.url ??
    // @ts-ignore
    response?.url ??
    '';
  const urlText = url ? `请求地址：${url}` : '';

  // statusCode
  const statusCode =
    error?.status ??
    // @ts-ignore
    error?.statusCode ??
    // @ts-ignore
    error?.data?.status ??
    // @ts-ignore
    error?.data?.statusCode ??
    response?.status ??
    // @ts-ignore
    response?.statusCode ??
    response?.data?.status ??
    response?.data?.statusCode ??
    0;
  const statusCodeText = statusCode ? `状态代码：${statusCode}` : '';

  // errorCode
  const errorCode =
    error?.code ??
    // @ts-ignore
    error?.errno ??
    // @ts-ignore
    error?.data?.code ??
    // @ts-ignore
    error?.data?.errno ??
    // @ts-ignore
    response?.code ??
    // @ts-ignore
    response?.errno ??
    response?.data?.code ??
    response?.data?.errno ??
    '';
  const errorCodeText = errorCode ? `错误代码：${errorCode}` : '';

  // errorMessage
  const errorMessage =
    // @ts-ignore
    error?.data?.errMsg ??
    // @ts-ignore
    error?.data?.message ??
    error?.message ??
    // @ts-ignore
    error?.errMsg ??
    response?.data?.errMsg ??
    response?.data?.message ??
    // @ts-ignore
    response?.message ??
    // @ts-ignore
    response?.errMsg ??
    '';
  const errorMessageText = errorMessage ? `错误信息：${errorMessage}` : '';

  const content = `${['发生了错误。', errorMessageText, errorCodeText, urlText, statusCodeText]
    .filter((item) => !!item)
    .join('\r\n')}`;

  if (showErrorType === 'modal' && !hasModal) {
    hasModal = true;
    Modal.error({
      title: '错误',
      content,
      onOk: () => (hasModal = false),
      onCancel: () => (hasModal = false),
    });
    return;
  }
  if (showErrorType === 'notification') {
    notification.error({
      message: '错误',
      description: content,
    });
    return;
  }
  if (showErrorType === 'message') {
    message.error({
      content,
    });
  }
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      showError(error as IResponseError);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      showError(error as IResponseError);
    },
  }),
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        // console.log('');
        // console.log('queryKey', queryKey);
        // console.log('');
        const urlParams = Array.isArray(queryKey[1]) ? queryKey[1] : [];
        let url = (queryKey[0] as any).toString() as string;
        for (const [idx, param] of urlParams.entries()) {
          url = url.replace(`:${idx}`, param.toString() as string);
        }
        const params = queryKey[2] as Record<string, any>;
        const config = queryKey[3] as IRequestConfig;
        const response = await instance.request<IResponseData>({
          method: 'GET',
          url,
          params,
          ...config,
        });
        if (!(response?.data?.success ?? true)) {
          if (reSignInCodes.has(response?.data.code ?? '')) {
            setToken();
            showError({
              message: '请重新登录。',
            } as IResponseError);
          } else if (config?.showError ?? true) {
            showError({
              response,
              error: response?.data as unknown as IResponseError,
              showErrorType: config?.showErrorType,
            });
          }
        }
        return response?.data;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      mutationFn: async (variables) => {
        // console.log('');
        // console.log('variables', variables);
        // console.log('');
        const config = { ...(variables as IRequestConfig) };
        const response = await instance.request<IResponseData>({
          method: 'POST',
          ...config,
        });
        if (!(response?.data?.success ?? true)) {
          if (reSignInCodes.has(response?.data?.code ?? '')) {
            setToken();
            showError({
              message: '请重新登录。',
            } as IResponseError);
          } else if (config?.showError ?? true) {
            showError({
              response,
              error: response?.data as unknown as IResponseError,
              showErrorType: config?.showErrorType,
            });
          }
        }
        return response?.data;
      },
    },
  },
});
