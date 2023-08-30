import dayjs from 'dayjs';
import 'dayjs/locale/types.d.ts';
import 'dayjs/locale/zh-cn';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import type { Plugin } from 'vue';

export const dayjsPlugin: Plugin = {
  install: () => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(updateLocale);
    dayjs.extend(isBetween);
    dayjs.extend(isSameOrBefore);
    dayjs.extend(isSameOrAfter);
    dayjs.extend(customParseFormat);
    dayjs.extend(duration);

    const updatedLocale: Partial<ILocale> = {
      weekStart: 0,
    };
    dayjs.updateLocale('zh-cn', updatedLocale);
    dayjs.locale('zh-cn');
    dayjs.tz.setDefault('Asia/Shanghai');
  },
};
