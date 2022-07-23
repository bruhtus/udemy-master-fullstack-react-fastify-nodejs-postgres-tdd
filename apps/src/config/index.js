function loadEnvironmentVariable(envName) {
  if (process.env[envName]) {
    return process.env[envName];
  }

  throw new Error(`${envName} does not exist!`);
}

module.exports = {
  database_uri: loadEnvironmentVariable('POSTGRES_URI'),
};
