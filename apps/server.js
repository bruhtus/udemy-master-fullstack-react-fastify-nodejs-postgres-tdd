const PORT = process.env.PORT || 3000;

// equivalent to running build function in app.js.
const server = require('./src/app')({
  logger: {
    level: 'info',
  },
});

async function start() {
  try {
    server.listen({ port: PORT });
  } catch (e) {
    server.log.error(e);
    process.exit(1);
  }
}

start();
