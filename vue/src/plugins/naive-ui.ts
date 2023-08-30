import naiveUi from 'naive-ui';
import type { Plugin } from 'vue';

export const naiveUiPlugin: Plugin = {
  install: (app) => {
    app.use(naiveUi);
  },
};
