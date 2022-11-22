import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export default defineNuxtPlugin(() => {
  dayjs.locale('zh-cn');
  dayjs.extend(customParseFormat);
});
