const tempHandler = require('../../handler/temp.handler');

async function route(fastify) {
  const handler = tempHandler(fastify);

  fastify.post('/', async (request, reply) => {
    fastify.log.info(`request with body: ${request}`);
    const { title } = request.body;

    const id = await handler.post(title);
    return reply.code(201).send(id);
  });

  fastify.get('/', async (request, reply) => {
    const allItems = await handler.getMany();
    return reply.code(200).send(allItems);
  });
}

module.exports = route;
