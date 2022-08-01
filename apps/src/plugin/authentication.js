const fp = require('fastify-plugin');
const jwt = require('@fastify/jwt');

async function authentication(fastify, options, next) {
  fastify.register(jwt, {
    // TODO: move this to .env.
    secret: 'supersecretvalue',
  });

  fastify.decorate('authenticate', async (request, reply) => {
    try {
      // Note:
      // extract JWT token from authorization header and remove Bearer in front
      // of JWT token.
      await request.jwtVerify();
    } catch (error) {
      reply.send(error);
    }
  });

  next();
}

module.exports = fp(authentication);
