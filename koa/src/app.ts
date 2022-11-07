import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Koa from 'koa';
import pinoLogger from 'koa-pino-logger';
// import sslify from 'koa-sslify';
import cors from '@koa/cors';
import mount from 'koa-mount';
import serve from 'koa-static';
import { koaBody as body } from 'koa-body';
import { routes } from '@/routes';
import { pinoPrettyStream, logger } from '@/helpers';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const app = new Koa();

app
  .use(pinoLogger(pinoPrettyStream))
  // .use(sslify())
  .use(cors())
  .use(body({ multipart: true }))
  .use(mount('/static', serve(resolve(__dirname, 'static'))))
  .use(routes('/api'));

export const startApp = () =>
  app.listen(3000, () => {
    logger.info('Koa is listening localhost:3000 ONLY FOR PROTOTYPING');
  });
