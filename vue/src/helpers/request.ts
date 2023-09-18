import axios from 'axios';
import qs from 'qs';
import {
  QueryClient,
  QueryCache,
  MutationCache,
  type VueQueryPluginOptions,
} from '@tanstack/vue-query';
import { router } from '@/router';
import { DefaultBaseUrl, DefaultHeaders } from '@/constants';
import { useAuthStore } from '@/stores';

const reSignInCodes = new Set(['LOGIN_REQUIRED', 'LOGIN_TOKEN_INVALID', 'LOGIN_SESSION_EXPIRED']);

const instance = axios.create({
  baseURL: DefaultBaseUrl,
  timeout: 30_000,
  paramsSerializer: {
    serialize: (params) =>
      qs.stringify(
        Object.fromEntries(
          Object.entries(params).filter(
            ([, v]) =>
              !['undefined', 'null', undefined, null].includes((v as any)?.toString() ?? v),
          ),
        ),
      ),
  },
});
instance.interceptors.request.use((config) => {
  // remove timeout for FormData submitting
  if (config.headers?.['Content-Type'] === 'multipart/form-data' && !!config.timeout) {
    config.timeout = 0;
  }
  return config;
});
export { instance as axiosInstance };

export const showRequestError = ({
  hasPrefix = true,
  message,
  response,
  error,
  type = 'dialog',
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

  const items = [
    hasPrefix ? '发生了错误。' : '',
    errorMessageText,
    errorCodeText,
    methodText,
    urlText,
    statusCodeText,
  ].filter((item) => !!item);
  const content = () =>
    h(
      'div',
      null,
      items.map((item) => h('p', null, item)),
    );
  switch (type) {
    case 'dialog': {
      window.$dialog.error({ title: '错误', content, positiveText: '确定' });
      break;
    }
    case 'notification': {
      window.$notification.error({ title: '错误', content });
      return;
    }
    case 'message': {
      window.$message.error(content);
      break;
    }
    // No default
  }
};

export const vueQueryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (axios.isCancel(error)) return;
      showRequestError({ error: error as IAxiosError });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (axios.isCancel(error)) return;
      showRequestError({ error: error as IAxiosError });
    },
  }),
  defaultOptions: {
    queries: {
      queryFn: async (context) => {
        const authStore = useAuthStore();
        const fullPath = router.currentRoute.value.fullPath;
        const queryKey = reactive({ ...context.queryKey });
        const url = queryKey[0] as string;
        const config = reactive({ ...(queryKey[1] as IAxiosRequestConfig) });
        const response = await instance.request<IAxiosResponseData>({
          method: 'GET',
          url,
          ...config,
          headers: {
            ...DefaultHeaders,
            token: authStore.token,
            'X-Token': authStore.token,
            'X-Access-Token': authStore.token,
            ...config.headers,
          },
        });
        if (!(response?.data?.success ?? true)) {
          if (reSignInCodes.has(response?.data.code ?? '')) {
            authStore.setToken();
            showRequestError({
              hasPrefix: false,
              message: '请重新登录。',
            });
            router.push({
              path: '/sign-in',
              query: {
                redirect: encodeURIComponent(fullPath),
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
        const authStore = useAuthStore();
        const fullPath = router.currentRoute.value.fullPath;
        const config = reactive({ ...(variables as IAxiosRequestConfig) });
        const response = await instance.request<IAxiosResponseData>({
          method: 'POST',
          ...config,
          headers: {
            ...DefaultHeaders,
            token: authStore.token,
            'X-Token': authStore.token,
            'X-Access-Token': authStore.token,
            ...config.headers,
          },
        });
        if (!(response?.data?.success ?? true)) {
          if (reSignInCodes.has(response?.data?.code ?? '')) {
            authStore.setToken();
            showRequestError({
              hasPrefix: false,
              message: '请重新登录。',
            });
            router.push({
              path: '/sign-in',
              query: {
                redirect: encodeURIComponent(fullPath),
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
    },
  },
});

export const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient: vueQueryClient,
};
