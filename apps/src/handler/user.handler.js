const userDao = require('../data-access-object/user.dao');

function userHandler(fastify) {
  const dao = userDao(fastify.db);

  async function createUserHandler(user) {
    const userId = await dao.createUser(user);
    return userId;
  }

  async function getUserByIdHandler(userId) {
    const user = await dao.getUserById(userId);
    const name = [user.first_name, user.middle_name, user.last_name]
      .filter((name) => name !== undefined)
      .filter((name) => name !== null)
      .join(' ');

    return {
      id: user.id,
      name,
      email: user.email,
    };
  }

  async function getUserByEmailHandler(email, password) {
    const user = await dao.getUserByEmail(email);

    if (user.password !== password) {
      throw new Error('Incorrect password');
    }

    const name = [user.first_name, user.middle_name, user.last_name]
      .filter((name) => name !== undefined)
      .filter((name) => name !== null)
      .join(' ');

    return {
      id: user.id,
      name,
      email: user.email,
    };
  }

  return { createUserHandler, getUserByIdHandler, getUserByEmailHandler };
}

module.exports = userHandler;
