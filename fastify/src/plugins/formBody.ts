import fp from 'fastify-plugin';
import formBody from '@fastify/formbody';

export default fp(async (fastify) => {
  fastify.register(formBody);
});
