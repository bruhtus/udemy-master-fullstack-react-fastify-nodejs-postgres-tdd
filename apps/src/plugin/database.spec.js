const Fastify = require('fastify');
const dbPlugin = require('./database');
const applyMigration = require('./helper/migration');

// Note: mocking module
jest.mock('./helper/migration');

describe('database plugin', () => {
  beforeAll(() => {
    applyMigration.mockImplementation(() => jest.fn());
  });

  it('should be able to attach db plugin to fastify', async () => {
    const fastify = Fastify();
    fastify.register(dbPlugin);

    await fastify.ready();
    expect(fastify.db).toBeDefined();
    await fastify.close();
  });
});
