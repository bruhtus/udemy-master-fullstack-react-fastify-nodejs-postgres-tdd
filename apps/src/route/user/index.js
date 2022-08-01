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
        return reply.code(201).send({
          data: { id },
        });
      } catch (error) {
        return reply.code(400).send(error);
      }
    }
  );

  fastify.post(
    '/login',
    {
      schema: {
        tags: ['User'],
        body: schema.loginRequestSchema,
        response: schema.loginResponseSchema,
      },
    },
    async (request, reply) => {
      try {
        const { email, password } = request.body;
        const user = await handler.getUserByEmailHandler(email, password);

        // Note: create JWT token.
        const token = fastify.jwt.sign(user);

        return reply.code(200).send({ token: `Bearer ${token}` });
      } catch (error) {
        reply.code(401).send({
          message: error.message,
        });
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
      return reply.code(200).send({
        data: user,
      });
    }
  );
}

module.exports = userRoute;
