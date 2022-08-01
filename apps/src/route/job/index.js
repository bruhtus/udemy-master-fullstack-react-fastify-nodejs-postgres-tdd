const luxon = require('luxon');
const jobHandler = require('../../handler/job.handler');
const schema = require('./job.schema');

async function jobRoute(fastify) {
  fastify.post(
    '/',
    {
      schema: {
        tags: ['Job'],
        body: schema.postRequestSchema,
      },
      preHandler: (request, reply, done) => {
        const { expired_at } = request.body;
        const today = luxon.DateTime.now().toFormat('yyyy-MM-dd');

        if (expired_at <= today) {
          return reply
            .code(400)
            .send({ message: 'expired date must be at least tomorrow date' });
        }

        done();
      },
    },
    async (request, reply) => {
      try {
        const body = request.body;

        const id = await jobHandler.createJobHandler(fastify, body);
        return reply.code(201).send({
          data: { id },
        });
      } catch (error) {
        return reply.code(400).send(error);
      }
    }
  );

  fastify.get(
    '/',
    {
      schema: {
        tags: ['Job'],
        querystring: schema.querySchema,
      },
    },
    async (request, reply) => {
      // Note: authenticate request.
      await fastify.authenticate(request, reply);

      const { limit, offset } = request.query;

      const jobs = await jobHandler.getAllJobsHandler(fastify, limit, offset);
      return reply.code(200).send({
        data: jobs,
      });
    }
  );
}

module.exports = jobRoute;
