import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { Plugin } from 'vue';

export const dayjsPlugin: Plugin = {
  install: () => {
    dayjs.extend(customParseFormat);
  },
};
