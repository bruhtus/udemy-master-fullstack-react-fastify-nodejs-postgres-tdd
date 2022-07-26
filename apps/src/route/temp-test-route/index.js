const tempHandler = require('../../handler/temp.handler');
const tempSchema = require('./temp.schema');

async function route(fastify) {
  const handler = tempHandler(fastify);

  fastify.post(
    '/',
    {
      schema: {
        tags: ['Temp'],
        body: tempSchema.postRequestSchema,
        response: tempSchema.postResponseSchema,
      },
    },
    async (request, reply) => {
      fastify.log.info(`request with body: ${request}`);
      const { title } = request.body;

      const id = await handler.post(title);
      return reply.code(201).send({
        data: id,
      });
    }
  );

  fastify.get(
    '/',
    {
      schema: {
        tags: ['Temp'],
        response: tempSchema.getManyResponseSchema,
      },
    },
    async (request, reply) => {
      const allItems = await handler.getMany();
      return reply.code(200).send({
        data: allItems,
      });
    }
  );
}

module.exports = route;
