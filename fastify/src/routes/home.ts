import { FastifyPluginAsync } from 'fastify';

const home: FastifyPluginAsync = async (fastify, options): Promise<void> => {
  fastify.get('/', async (request, reply) => {
    return 'Home';
  });

  fastify.post('/', async (request, reply) => {
    reply.send(request.body);
  });
};

export default home;
