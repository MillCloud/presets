import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import routes from '~react-pages';
import { queryClient } from './helpers/request';

export const App = memo(() => (
  <ConfigProvider locale={zhCN}>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<p className="p-20 text-center">加载中</p>}>{useRoutes(routes)}</Suspense>
    </QueryClientProvider>
  </ConfigProvider>
));

export default App;
