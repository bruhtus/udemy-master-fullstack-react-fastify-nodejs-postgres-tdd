const tempDao = require('../data-access-object/temp.dao');

function tempHandler(fastify) {
  const dao = tempDao(fastify);

  async function getMany() {
    return await dao.getMany();
  }

  async function post(title) {
    return await dao.post(title);
  }

  return { getMany, post };
}

module.exports = tempHandler;
