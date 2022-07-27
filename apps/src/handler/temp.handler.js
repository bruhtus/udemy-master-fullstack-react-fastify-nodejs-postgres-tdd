const tempDao = require('../data-access-object/temp.dao');

function tempHandler(fastify) {
  const dao = tempDao(fastify);

  async function post(title) {
    return await dao.post(title);
  }

  async function getMany() {
    return await dao.getMany();
  }

  return { post, getMany };
}

module.exports = tempHandler;
