const fp = require('fastify-plugin');
const pgp = require('pg-promise')();
const applyMigration = require('./helper/migration');

async function db(fastify, options, next) {
  const dbConnection = pgp(process.env.POSTGRES_URI);

  // attach our db connection to fastify with `db` name.
  // the usage: fastify.db
  fastify.decorate('db', dbConnection);

  // how many migration applied.
  fastify.log.info('Migration is starting...');
  const migrationCount = await applyMigration();
  fastify.log.info(`${migrationCount} migration applied.`);

  next();
}

module.exports = fp(db);
