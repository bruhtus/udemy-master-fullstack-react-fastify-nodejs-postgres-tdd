const fastify = require('fastify');
const db = require('./plugin/database');
const rootRoute = require('./route/root-route');
const testRoute = require('./route/temp-test-route');
const swaggerPlugin = require('./plugin/swagger');
const userRoute = require('./route/user');

function build(opts = {}) {
  const app = fastify(opts);

  // register plugins.
  app.register(db);
  app.register(swaggerPlugin);

  // register route.
  app.register(rootRoute);
  app.register(testRoute, { prefix: 'api/v1/test' });
  app.register(userRoute, { prefix: 'api/v1/user' });

  return app;
}

module.exports = build;
