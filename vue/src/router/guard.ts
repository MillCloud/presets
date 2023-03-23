import nprogress from 'nprogress';
import type { Plugin } from 'vue';
import { router } from './router';

export const routerGuard: Plugin = {
  install: () => {
    router.beforeEach((to, from, next) => {
      nprogress.start();
      next();
    });

    router.afterEach(() => {
      nprogress.done();
    });
  },
};
