import Router, { type ZodRouter } from 'koa-zod-router';
import { initRoutes as initHomeRoutes } from './home';

const router = Router();

const initRoutes = (router: ZodRouter) => {
  initHomeRoutes(router);
  return router;
};

export const routes = (prefix?: string) => {
  if (prefix) router.prefix(prefix);
  return initRoutes(router).middleware();
};
