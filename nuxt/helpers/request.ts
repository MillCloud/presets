import { reactive } from 'vue';
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus';
import axios from 'axios';
import qs from 'qs';
import { QueryClient, QueryCache, MutationCache } from '@tanstack/vue-query';
import { Headers } from '@/constants';
import { getToken, setToken } from './storage';
import type { VueQueryPluginOptions } from '@tanstack/vue-query';
import type { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';

export type IRequestShowErrorType = 'alert' | 'message' | 'notification';
export interface IResponseData {
  success: boolean;
  code: string;
  message: string;
  [key: string]: any;
}
export interface IResponse extends AxiosResponse<IResponseData> {}
export interface IResponseError extends AxiosError<IResponseData> {
  response?: IResponse;
}
export interface IRequestConfig extends AxiosRequestConfig {
  showError?: boolean;
  showErrorType?: IRequestShowErrorType;
}

const reSignInCodes = new Set(['LOGIN_REQUIRED', 'LOGIN_TOKEN_INVALID', 'LOGIN_SESSION_EXPIRED']);

const instance = axios.create({
  baseURL:
    (import.meta.env.VITE_REQUEST_BASE_URL as string | undefined) ||
    'https://jsonplaceholder.typicode.com/',
  timeout: 30_000,
  headers: {
    ...Headers,
  },
  paramsSerializer: {
    serialize: (params) =>
      qs.stringify(
        Object.fromEntries(
          Object.entries(params).filter(
            ([, v]) =>
              !['', 'undefined', 'null', undefined, null].includes((v as any)?.toString() ?? v),
          ),
        ),
      ),
  },
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

let hasMessageBox = false;
export const showRequestError = ({
  hasPrefix = true,
  message,
  response,
  error,
  type = 'alert',
}: {
  hasPrefix?: boolean;
  message?: string;
  response?: IResponse;
  error?: IResponseError;
  type?: IRequestShowErrorType;
} = {}) => {
  // method
  const method =
    error?.config?.method ??
    error?.request?.method ??
    // @ts-ignore
    error?.method ??
    response?.config?.method ??
    response?.request?.method ??
    // @ts-ignore
    response?.method ??
    '';
  const methodText = method ? `请求方法：${method}` : '';

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
    .join('<br />')}`;

  if (type === 'alert' && !hasMessageBox) {
    hasMessageBox = true;
    ElMessageBox.alert(content, {
      title: '错误',
      type: 'error',
      dangerouslyUseHTMLString: true,
    })
      .catch(() => {
        hasMessageBox = false;
      })
      .finally(() => {
        hasMessageBox = false;
      });
    return;
  }
  if (type === 'notification') {
    ElNotification.error({
      title: '错误',
      message: content,
      dangerouslyUseHTMLString: true,
    });
    return;
  }
  if (type === 'message') {
    ElMessage.error({
      message: content,
      dangerouslyUseHTMLString: true,
    });
  }
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      showRequestError({ error: error as IResponseError });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      showRequestError({ error: error as IResponseError });
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
        const config = key[3] as IRequestConfig;
        const response = await instance.request<IResponseData>({
          method: 'GET',
          url,
          params,
          ...config,
        });
        if (!(response?.data?.success ?? true)) {
          if (reSignInCodes.has(response?.data.code ?? '')) {
            setToken();
            showRequestError({
              hasPrefix: false,
              message: '请重新登录。',
            });
          } else if (config?.showError ?? true) {
            showRequestError({
              response,
              error: response?.data as unknown as IResponseError,
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
        const config = reactive({ ...(variables as IRequestConfig) });
        const response = await instance.request<IResponseData>({
          method: 'POST',
          ...config,
        });
        if (!(response?.data?.success ?? true)) {
          if (reSignInCodes.has(response?.data?.code ?? '')) {
            setToken();
            showRequestError({
              hasPrefix: false,
              message: '请重新登录。',
            });
          } else if (config?.showError ?? true) {
            showRequestError({
              response,
              error: response?.data as unknown as IResponseError,
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
