import Router from 'koa-joi-router';
import { initRoutes as initHomeRoutes } from './home';

const router = Router();

const initRoutes = (router: Router.Router) => {
  initHomeRoutes(router);
  return router;
};

export const routes = (prefix?: string) => {
  if (prefix) router.prefix(prefix);
  return initRoutes(router).middleware();
};
