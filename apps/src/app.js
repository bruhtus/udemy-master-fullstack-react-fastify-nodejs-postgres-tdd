const fastify = require('fastify');
const db = require('./plugin/database');
const testRoute = require('./route/temp-test-route');
const swaggerPlugin = require('./plugin/swagger');

function build(opts = {}) {
  const app = fastify(opts);

  // register plugins.
  app.register(db);
  app.register(swaggerPlugin);

  // register route.
  app.register(testRoute, { prefix: 'api/v1/test' });

  app.get('/', (request, reply) => {
    return reply.code(200).send({ hello: 'world' });
  });

  return app;
}

module.exports = build;
