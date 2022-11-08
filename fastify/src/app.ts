// import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import { logger } from './helpers';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const app = fastify({
  logger,
  // http2: true,
  // https: {
  //   allowHTTP1: true,
  //   // generate these yourself
  //   // see https://github.com/FiloSottile/mkcert
  //   key: readFileSync(resolve(__dirname, 'https', 'fastify.key')),
  //   cert: readFileSync(resolve(__dirname, 'https', 'fastify.cert')),
  // },
});

app
  .register(AutoLoad, {
    dir: resolve(__dirname, 'plugins'),
  })
  .register(AutoLoad, {
    dir: resolve(__dirname, 'routes'),
    options: {
      prefix: '/api',
    },
  });

export const startApp = async () => {
  await app.listen({ port: 3000 });
  logger.info('Fastify is listening localhost:3000 ONLY FOR PROTOTYPING');
};
