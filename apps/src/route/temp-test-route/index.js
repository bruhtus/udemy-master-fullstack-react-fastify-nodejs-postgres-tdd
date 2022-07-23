async function route(fastify) {
  fastify.post('/', async (request, reply) => {
    fastify.log.info(`request with body: ${request}`);
    const { title } = request.body;

    const id = await fastify.db.one(
      'INSERT INTO test_table(title) VALUES($1) RETURNING id',
      [title]
    );

    reply.code(201).send(id);
  });

  fastify.get('/', async (request, reply) => {
    const allItems = await fastify.db.query('SELECT * FROM test_table');
    reply.code(200).send(allItems);
  });
}

module.exports = route;
