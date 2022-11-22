import { VueQueryPlugin } from '@tanstack/vue-query';
import { vueQueryPluginOptions } from '@/helpers';
import type { Plugin } from 'vue';

export const plugin: Plugin = {
  install: (app) => {
    app.use(VueQueryPlugin, vueQueryPluginOptions);
  },
};
