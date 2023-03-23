import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export default defineNuxtPlugin(() => {
  dayjs.extend(customParseFormat);
});
