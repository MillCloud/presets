import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import browserUpdate from 'browser-update';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import 'nprogress/nprogress.css';
import 'modern-normalize';
import '@/styles/preflight.css';
import '@/styles/antd.less';
import '@/styles/tailwind.css';
import '@/styles/global.scss';

import { App } from './App';

browserUpdate({
  required: { e: 79, f: 67, o: 50, s: 12, c: 63 },
  insecure: true,
  unsupported: true,
});

dayjs.locale('zh-cn');
dayjs.extend(customParseFormat);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
