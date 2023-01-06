import { reactive } from 'vue';
import un from '@uni-helper/uni-network';
import qs from 'qs';
import { QueryClient, QueryCache, MutationCache } from '@tanstack/vue-query';
import { Headers } from '@/constants';
import { showModal } from './modal';
import { getToken, setToken } from './storage';
import { showToast } from './toast';
import type { VueQueryPluginOptions } from '@tanstack/vue-query';

const reSignInCodes = new Set(['LOGIN_REQUIRED', 'LOGIN_TOKEN_INVALID', 'LOGIN_SESSION_EXPIRED']);

const instance = un.create({
  baseUrl: import.meta.env.VITE_REQUEST_BASE_URL || 'https://jsonplaceholder.typicode.com/',
  timeout: 30000,
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
    // @ts-ignore
    error?.method ??
    response?.config?.method ??
    response?.task?.method ??
    // @ts-ignore
    response?.method ??
    '';
  const methodText = method ? `请求方法：${method}` : '';

  // url
  const url =
    error?.config?.url ??
    error?.task?.url ??
    // @ts-ignore
    error?.url ??
    response?.config?.url ??
    response?.task?.url ??
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
    // @ts-ignore
    error?.data?.msg ??
    // @ts-ignore
    error?.errMsg ??
    error?.message ??
    // @ts-ignore
    error?.msg ??
    response?.data?.errMsg ??
    response?.data?.message ??
    response?.data?.msg ??
    // @ts-ignore
    response?.errMsg ??
    // @ts-ignore
    response?.message ??
    // @ts-ignore
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
      queryFn: async ({ queryKey }) => {
        // console.log('');
        // console.log('queryKey', queryKey);
        // console.log('');
        const key = reactive(queryKey);
        const urlParams = Array.isArray(key[1]) ? key[1] : [];
        let url = (key[0] as any).toString() as string;
        for (const [idx, param] of urlParams.entries()) {
          url = url.replace(`:${idx}`, param.toString() as string);
        }
        const params = key[2] as Record<string, any>;
        const config = key[3] as IUnConfig;
        const response = await instance.request<IUnResponseData, IUnRequestData, IUnResponse>({
          method: 'GET',
          url,
          params,
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
      refetchOnWindowFocus: false,
    },
    mutations: {
      mutationFn: async (variables) => {
        // console.log('');
        // console.log('variables', variables);
        // console.log('');
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
    },
  },
});

export const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient,
};
