import Router from 'koa-joi-router';

export const initRoutes = (router: Router.Router) => {
  // if you haven't modify prefix
  // GET localhost:3000/api or localhost:3000/api/
  router.get('/', async (ctx) => {
    ctx.body = 'Home';
  });

  router.post('/', async (ctx) => {
    ctx.body = ctx.request.body;
  });

  return router;
};
