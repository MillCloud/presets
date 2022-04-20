import nprogress from 'nprogress';
import router from './router';

router.beforeEach((to, from, next) => {
  nprogress.start();
  next();
});

router.afterEach(() => {
  nprogress.done();
});
