import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import fp from 'fastify-plugin';
import serve from '@fastify/static';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default fp(async (fastify) => {
  fastify.register(serve, { root: resolve(__dirname, '..', 'static'), prefix: '/static/' });
});
