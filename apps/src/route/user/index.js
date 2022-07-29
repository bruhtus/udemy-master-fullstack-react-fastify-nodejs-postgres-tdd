const userHandler = require('../../handler/user.handler');
const schema = require('./user.schema');

async function userRoute(fastify) {
  const handler = userHandler(fastify);

  fastify.post(
    '/',
    {
      schema: {
        tags: ['User'],
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

  fastify.get(
    '/:id',
    {
      schema: {
        tags: ['User'],
        params: schema.paramsSchema,
        response: schema.getByIdResponseSchema,
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const user = await handler.getUserByIdHandler(id);
      reply.code(200).send({
        data: user,
      });
    }
  );
}

module.exports = userRoute;
