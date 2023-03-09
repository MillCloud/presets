import { reactive } from 'vue';
import un from '@uni-helper/uni-network';
import qs from 'qs';
import { QueryClient, QueryCache, MutationCache } from '@tanstack/vue-query';
import type { VueQueryPluginOptions } from '@tanstack/vue-query';
import { showModal } from './modal';
import { getToken, setToken } from './storage';
import { showToast } from './toast';
import { Headers } from '@/constants';

const reSignInCodes = new Set(['LOGIN_REQUIRED', 'LOGIN_TOKEN_INVALID', 'LOGIN_SESSION_EXPIRED']);

const instance = un.create({
  baseUrl: import.meta.env.VITE_REQUEST_BASE_URL || 'https://jsonplaceholder.typicode.com/',
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
instance.interceptors.request.use((config) => {
  config.headers = config.headers ?? {};
  config.headers.token = getToken();
  config.headers['X-Token'] = getToken();
  config.headers['X-Access-Token'] = getToken();
  return config;
});

export { instance as unInstance };

let hasModal = false;
export const showNetworkError = ({
  hasPrefix = true,
  message,
  response,
  error,
  type = 'modal' as IUnShowErrorType,
  success,
  fail,
  complete,
}:
  | {
      hasPrefix?: boolean;
      message?: string;
      response?: IUnResponse;
      error?: IUnError;
      type?: 'modal';
      success?: UniApp.ShowModalOptions['success'];
      fail?: UniApp.ShowModalOptions['fail'];
      complete?: UniApp.ShowModalOptions['complete'];
    }
  | {
      hasPrefix?: boolean;
      message?: string;
      response?: IUnResponse;
      error?: IUnError;
      type: 'toast';
      success?: UniApp.ShowToastOptions['success'];
      fail?: UniApp.ShowToastOptions['fail'];
      complete?: UniApp.ShowToastOptions['complete'];
    } = {}) => {
  // method
  const method =
    error?.config?.method ??
    error?.task?.method ??
    // @ts-expect-error no types
    error?.method ??
    response?.config?.method ??
    response?.task?.method ??
    // @ts-expect-error no types
    response?.method ??
    '';
  const methodText = method ? `请求方法：${method}` : '';

  // url
  const url =
    error?.config?.url ??
    error?.task?.url ??
    // @ts-expect-error no types
    error?.url ??
    response?.config?.url ??
    response?.task?.url ??
    // @ts-expect-error no types
    response?.url ??
    '';
  const urlText = url ? `请求地址：${url}` : '';

  // statusCode
  const statusCode =
    error?.status ??
    // @ts-expect-error no types
    error?.statusCode ??
    // @ts-expect-error no types
    error?.data?.status ??
    // @ts-expect-error no types
    error?.data?.statusCode ??
    response?.status ??
    // @ts-expect-error no types
    response?.statusCode ??
    response?.data?.status ??
    response?.data?.statusCode ??
    0;
  const statusCodeText = statusCode ? `状态代码：${statusCode}` : '';

  // errorCode
  const errorCode =
    error?.code ??
    // @ts-expect-error no types
    error?.errno ??
    // @ts-expect-error no types
    error?.data?.code ??
    // @ts-expect-error no types
    error?.data?.errno ??
    // @ts-expect-error no types
    response?.code ??
    response?.errno ??
    response?.data?.code ??
    response?.data?.errno ??
    '';
  const errorCodeText = errorCode ? `错误代码：${errorCode}` : '';

  // errorMessage
  const errorMessage =
    // @ts-expect-error no types
    error?.data?.errMsg ??
    // @ts-expect-error no types
    error?.data?.message ??
    // @ts-expect-error no types
    error?.data?.msg ??
    // @ts-expect-error no types
    error?.errMsg ??
    error?.message ??
    // @ts-expect-error no types
    error?.msg ??
    response?.data?.errMsg ??
    response?.data?.message ??
    response?.data?.msg ??
    response?.errMsg ??
    // @ts-expect-error no types
    response?.message ??
    // @ts-expect-error no types
    response?.msg ??
    message ??
    '';
  const errorMessageText = errorMessage ? `错误信息：${errorMessage}` : '';

  const content = `${[
    hasPrefix ? '发生了错误。' : '',
    errorMessageText,
    errorCodeText,
    methodText,
    urlText,
    statusCodeText,
  ]
    .filter((item) => !!item)
    .join('\r\n')}`;

  if (type === 'toast') {
    showToast({
      title: content,
      success,
      fail,
      complete,
    });
    return;
  }
  if (type === 'modal' && !hasModal) {
    hasModal = true;
    showModal({
      title: '错误',
      content,
      success: (result) => {
        success?.(result);
        hasModal = false;
      },
      fail: (result) => {
        fail?.(result);
        hasModal = false;
      },
      complete,
    });
  }
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      showNetworkError({ error: error as IUnError });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      showNetworkError({ error: error as IUnError });
    },
  }),
  defaultOptions: {
    queries: {
      queryFn: async (context) => {
        const queryKey = reactive({ ...context.queryKey });
        const url = queryKey[0] as string;
        const config = reactive({ ...(queryKey[1] as IUnConfig) });
        const response = await instance.request<IUnResponseData, IUnRequestData, IUnResponse>({
          method: 'GET',
          url,
          ...config,
        });
        if (!(response?.data?.success ?? true)) {
          if (reSignInCodes.has(response?.data?.code ?? '')) {
            setToken();
            showNetworkError({
              hasPrefix: false,
              message: '请重新登录。',
            });
            uni.reLaunch({
              url: '/pages/index',
            });
          } else if (config?.showError ?? true) {
            showNetworkError({
              response,
              error: response?.data as unknown as IUnError,
              type: config?.showErrorType,
            });
          }
        }
        return response?.data;
      },
      retry: 3,
      refetchOnWindowFocus: import.meta.env.PROD,
    },
    mutations: {
      mutationFn: async (variables) => {
        const config = reactive({ ...(variables as IUnConfig) });
        const response = await instance.request<IUnResponseData, IUnRequestData, IUnResponse>({
          method: 'POST',
          ...config,
        });
        if (!(response?.data?.success ?? true)) {
          if (reSignInCodes.has(response?.data?.code ?? '')) {
            setToken();
            showNetworkError({
              hasPrefix: false,
              message: '请重新登录。',
            });
            uni.reLaunch({
              url: '/pages/index',
            });
          } else if (config?.showError ?? true) {
            showNetworkError({
              response,
              error: response?.data as unknown as IUnError,
              type: config?.showErrorType,
            });
          }
        }
        return response?.data;
      },
      retry: 3,
    },
  },
});

export const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient,
};
