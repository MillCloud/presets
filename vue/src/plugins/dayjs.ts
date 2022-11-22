import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { Plugin } from 'vue';

export const plugin: Plugin = {
  install: () => {
    dayjs.locale('zh-cn');
    dayjs.extend(customParseFormat);
  },
};
