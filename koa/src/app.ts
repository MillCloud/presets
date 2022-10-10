import Koa from 'koa';
import pinoLogger from 'koa-pino-logger';
// import sslify from 'koa-sslify';
import cors from '@koa/cors';
import mount from 'koa-mount';
import serve from 'koa-static';
import body from 'koa-body';
import { routes } from '@/routes';
import { pinoPrettyStream, logger } from '@/helpers';

export const app = new Koa();

app
  .use(pinoLogger(pinoPrettyStream))
  // .use(sslify())
  .use(cors())
  .use(body({ multipart: true }))
  .use(mount('/static', serve('./src/static')))
  .use(routes('/api'));

export const startApp = () =>
  app.listen(3000, () => {
    logger.info('Koa is listening localhost:3000 ONLY FOR PROTOTYPING');
  });
