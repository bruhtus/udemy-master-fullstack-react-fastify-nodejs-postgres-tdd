const fp = require('fastify-plugin');
const pgp = require('pg-promise')();
const applyMigration = require('./helper/migration');
const config = require('../config');

async function db(fastify, options, next) {
  const dbConnection = pgp({
    connectionString: config.database_uri,
    allowExitOnIdle: true,
  });

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
