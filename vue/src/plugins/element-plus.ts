import ep from 'element-plus';
import type { Plugin } from 'vue';

export const plugin: Plugin = {
  install: (app) => {
    app.use(ep);
  },
};
