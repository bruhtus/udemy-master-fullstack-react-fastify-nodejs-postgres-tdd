function tempRepository(fastify) {
  async function post(title) {
    return await fastify.db.one(
      'INSERT INTO test_table(title) VALUES($1) RETURNING id',
      [title]
    );
  }

  async function getMany() {
    return await fastify.db.query('SELECT * FROM test_table');
  }

  return { post, getMany };
}

module.exports = tempRepository;
