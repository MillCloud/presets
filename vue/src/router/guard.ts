import nprogress from 'nprogress';
import { router } from './router';

export const guardRouter = () => {
  router.beforeEach((to, from, next) => {
    nprogress.start();
    next();
  });

  router.afterEach(() => {
    nprogress.done();
  });
};
