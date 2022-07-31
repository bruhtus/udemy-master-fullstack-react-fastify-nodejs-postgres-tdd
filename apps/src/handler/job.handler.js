const luxon = require('luxon');
const jobDao = require('../data-access-object/job.dao');

async function createJobHandler(fastify, job) {
  const jobId = await jobDao.createJob(fastify.db, job);
  return jobId;
}

async function getAllJobsHandler(fastify, limit, offset) {
  const jobs = await jobDao.getAllJobs(fastify.db, limit, offset);
  return jobs.map((job) => {
    return {
      ...job,
      created_at: luxon.DateTime.fromISO(job.created_at).toFormat('yyyy-MM-dd'),
      updated_at: luxon.DateTime.fromISO(job.updated_at).toFormat('yyyy-MM-dd'),
    };
  });
}

module.exports = { createJobHandler, getAllJobsHandler };
