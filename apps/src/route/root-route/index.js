async function route(fastify) {
  fastify.get(
    '/',
    {
      schema: {
        tags: ['Root'],
      },
    },
    (request, reply) => {
      return reply.code(200).send({ hello: 'world' });
    }
  );
}

module.exports = route;
