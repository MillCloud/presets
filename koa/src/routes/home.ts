import type { ZodRouter } from 'koa-zod-router';

export const initRoutes = (router: ZodRouter) => {
  // if you haven't modify prefix
  // GET localhost:3000/api or localhost:3000/api/
  router.get('/', async (ctx) => {
    ctx.body = 'Hello Koa!';
  });

  router.post('/', async (ctx) => {
    ctx.body = ctx.request.body;
  });

  return router;
};
