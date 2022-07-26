const fp = require('fastify-plugin');
const swagger = require('@fastify/swagger');

function swaggerPlugin(fastify, options, next) {
  const swaggerConfig = {
    info: {
      title: 'Test swagger',
      description: 'Testing Fastify API',
      version: '0.1.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    host: '127.0.0.1:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    definitions: {},
  };

  fastify.register(swagger, {
    routePrefix: '/docs',
    swagger: swaggerConfig,
    uiConfig: {
      deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true,
  });

  next();
}

module.exports = fp(swaggerPlugin);
