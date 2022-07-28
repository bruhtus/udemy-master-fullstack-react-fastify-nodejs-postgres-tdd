const userHandler = require('../../handler/user.handler');
const schema = require('./user.schema');

async function userRoute(fastify) {
  const handler = userHandler(fastify);

  fastify.post(
    '/',
    {
      schema: {
        body: schema.postRequestSchema,
        response: schema.postResponseSchema,
      },
    },
    async (request, reply) => {
      try {
        const body = request.body;

        const id = await handler.createUserHandler(body);
        reply.code(201).send({
          data: { id },
        });
      } catch (error) {
        reply.code(400).send(error);
      }
    }
  );
}

module.exports = userRoute;
