const fastify = require('fastify');
const cors = require('@fastify/cors');
const db = require('./plugin/database');
const rootRoute = require('./route/root-route');
const testRoute = require('./route/temp-test-route');
const swaggerPlugin = require('./plugin/swagger');
const userRoute = require('./route/user');
const jobRoute = require('./route/job');

function build(opts = {}) {
  const app = fastify(opts);

  // register cors.
  app.register(cors);

  // register plugins.
  app.register(db);
  app.register(swaggerPlugin);

  // register route.
  app.register(rootRoute);
  app.register(testRoute, { prefix: 'api/v1/test' });
  app.register(userRoute, { prefix: 'api/v1/user' });
  app.register(jobRoute, { prefix: 'api/v1/job' });

  return app;
}

module.exports = build;
