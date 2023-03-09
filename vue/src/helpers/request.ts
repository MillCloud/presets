import { reactive } from 'vue';
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus';
import axios from 'axios';
import qs from 'qs';
import {
  QueryClient,
  QueryCache,
  MutationCache,
  type VueQueryPluginOptions,
} from '@tanstack/vue-query';
import { getToken, setToken } from './storage';
import { DefaultHeaders } from '@/constants';
import { router } from '@/router';

const reSignInCodes = new Set(['LOGIN_REQUIRED', 'LOGIN_TOKEN_INVALID', 'LOGIN_SESSION_EXPIRED']);

const instance = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_BASE_URL || 'https://jsonplaceholder.typicode.com/',
  timeout: 30_000,
  headers: {
    ...DefaultHeaders,
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
instance.interceptors.request.use((config) => {
  config.headers.token = getToken();
  config.headers['X-Token'] = getToken();
  config.headers['X-Access-Token'] = getToken();
  return config;
});

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
  response?: IAxiosResponse;
  error?: IAxiosError;
  type?: IAxiosShowErrorType;
} = {}) => {
  // method
  const method =
    error?.config?.method ??
    error?.request?.method ??
    // @ts-expect-error no types
    error?.method ??
    response?.config?.method ??
    response?.request?.method ??
    // @ts-expect-error no types
    response?.method ??
    '';
  const methodText = method ? `请求方法：${method}` : '';

  // url
  const url =
    error?.config?.url ??
    error?.request?.url ??
    // @ts-expect-error no types
    error?.url ??
    response?.config?.url ??
    response?.request?.url ??
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
    // @ts-expect-error no types
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
    // @ts-expect-error no types
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
      showRequestError({ error: error as IAxiosError });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      showRequestError({ error: error as IAxiosError });
    },
  }),
  defaultOptions: {
    queries: {
      queryFn: async (context) => {
        const queryKey = reactive({ ...context.queryKey });
        const url = queryKey[0] as string;
        const config = reactive({ ...(queryKey[1] as IAxiosRequestConfig) });
        const response = await instance.request<IAxiosResponseData>({
          method: 'GET',
          url,
          ...config,
        });
        if (!(response?.data?.success ?? true)) {
          if (reSignInCodes.has(response?.data.code ?? '')) {
            setToken();
            showRequestError({
              hasPrefix: false,
              message: '请重新登录。',
            });
            router.push({
              path: '/sign-in',
              query: {
                redirect: encodeURIComponent(router.currentRoute.value.fullPath),
              },
            });
          } else if (config?.showError ?? true) {
            showRequestError({
              response,
              error: response?.data as unknown as IAxiosError,
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
        const config = reactive({ ...(variables as IAxiosRequestConfig) });
        const response = await instance.request<IAxiosResponseData>({
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
            router.push({
              path: '/sign-in',
              query: {
                redirect: encodeURIComponent(router.currentRoute.value.fullPath),
              },
            });
          } else if (config?.showError ?? true) {
            showRequestError({
              response,
              error: response?.data as unknown as IAxiosError,
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
