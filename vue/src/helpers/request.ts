import axios from 'axios';
import { ElMessageBox, ElNotification, ElMessage } from 'element-plus';
import qs from 'query-string';
import { QueryClient, QueryCache, MutationCache } from 'vue-query';
import { Headers } from '@/constants';
import router from '@/router';
import { getToken, setToken } from './storage';
import type { VueQueryPluginOptions } from 'vue-query';

const reSignInCodes = new Set(['LOGIN_REQUIRED', 'LOGIN_TOKEN_INVALID', 'LOGIN_SESSION_EXPIRED']);

const instance = axios.create({
  baseURL: process.env.VITE_REQUEST_BASE_URL || 'https://jsonplaceholder.typicode.com/todos/',
  timeout: 30_000,
  headers: {
    ...Headers,
  },
  paramsSerializer: (params: Record<string, any>) =>
    qs.stringify(
      Object.fromEntries(
        Object.entries(params).filter(
          ([, v]) => !['', 'undefined', 'null', undefined, null].includes(v?.toString() ?? v),
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

export const showError = (
  error: IResponseError,
  type: 'alert' | 'notification' | 'message' = 'alert',
) => {
  const contents = [];
  const code =
    error?.code ??
    error?.response?.data?.code ??
    // @ts-ignore
    error?.response?.code ??
    error?.response?.status ??
    '';
  if (code) {
    contents.push(`错误代码：${code}`);
  }
  // @ts-ignore
  const url = error?.url ?? error?.config?.url ?? error?.request?.url ?? '';
  if (url) {
    contents.push(`请求地址：${url}`);
  }
  const message =
    error?.message ?? error?.response?.data?.message ?? error?.response?.data?.msg ?? '';
  if (message) {
    contents.push(`错误信息：${message}`);
  }
  const content = contents.length <= 1 ? contents[0].split('：')[1] : `${contents.join('，')}。`;
  if (type === 'alert') {
    ElMessageBox.alert(content, {
      title: '错误',
      type: 'error',
    });
    return;
  }
  if (type === 'notification') {
    ElNotification.error({
      title: '错误',
      message: content,
    });
    return;
  }
  if (type === 'message') {
    ElMessage.error({
      message: content,
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
        const { data } = await instance.request<IResponseData>({
          method: 'GET',
          url,
          params,
          ...config,
        });
        if (!(data?.success ?? true)) {
          if (reSignInCodes.has(data.code)) {
            setToken();
            showError({
              message: '请重新登录。',
            } as IResponseError);
            router.push({
              path: '/sign-in',
              query: {
                redirect: encodeURIComponent(router.currentRoute.value.fullPath),
              },
            });
          } else if (config?.showError ?? true) {
            showError(data as unknown as IResponseError, config?.showErrorType);
          }
        }
        return data;
      },
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if ([403, 404, 500].includes((error as IResponseError).response?.status ?? 200)) {
          return false;
        }
        return failureCount < 3;
      },
    },
    mutations: {
      mutationFn: async (variables) => {
        // console.log('');
        // console.log('variables', variables);
        // console.log('');
        const config = { ...(variables as IRequestConfig) };
        const { data } = await instance.request<IResponseData>({
          method: 'POST',
          ...config,
        });
        if (!(data?.success ?? true)) {
          if (reSignInCodes.has(data.code)) {
            setToken();
            showError({
              message: '请重新登录。',
            } as IResponseError);
            router.push({
              path: '/sign-in',
              query: {
                redirect: encodeURIComponent(router.currentRoute.value.fullPath),
              },
            });
          } else if (config?.showError ?? true) {
            showError(data as unknown as IResponseError, config?.showErrorType);
          }
        }
        return data;
      },
      retry: (failureCount, error) => {
        if ([403, 404, 500].includes((error as IResponseError).response?.status ?? 200)) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

export const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient,
};
