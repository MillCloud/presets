import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import type { Plugin } from 'vue';

export const dayjsPlugin: Plugin = {
  install: () => {
    dayjs.extend(customParseFormat);
    dayjs.extend(isBetween);
  },
};
