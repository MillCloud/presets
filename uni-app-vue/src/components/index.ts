import VSpacer from './VSpacer.vue';
import type { Plugin } from 'vue';

const Components: Plugin = {
  install: (app) => {
    app.component('VSpacer', VSpacer);
  },
};

export default Components;
