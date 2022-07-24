function dataAccessObject(fastify) {
  async function getMany() {
    return await fastify.db.query('SELECT * FROM test_table');
  }

  async function post(title) {
    return await fastify.db.one(
      'INSERT INTO test_table(title) VALUES($1) RETURNING id',
      [title]
    );
  }

  return { getMany, post };
}

module.exports = dataAccessObject;
