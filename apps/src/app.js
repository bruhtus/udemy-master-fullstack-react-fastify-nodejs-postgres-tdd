const fastify = require('fastify');
const db = require('./plugin/database');
const rootRoute = require('./route/root-route');
const testRoute = require('./route/temp-test-route');
const swaggerPlugin = require('./plugin/swagger');

function build(opts = {}) {
  const app = fastify(opts);

  // register plugins.
  app.register(db);
  app.register(swaggerPlugin);

  // register route.
  app.register(testRoute, { prefix: 'api/v1/test' });
  app.register(rootRoute);

  return app;
}

module.exports = build;
