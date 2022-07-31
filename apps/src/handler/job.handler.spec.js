const jobHandler = require('./job.handler');
const jobDao = require('../data-access-object/job.dao');
const { v4: uuidv4 } = require('uuid');

describe('job handler', () => {
  const createJob = jest.spyOn(jobDao, 'createJob');
  const getAllJobs = jest.spyOn(jobDao, 'getAllJobs');

  const uuid = uuidv4();

  it('should be able to create job', async () => {
    createJob.mockReturnValueOnce(uuid);

    // Note:
    // we don't need to give all the properties for createJobHandler() because
    // we did not access the database and the schema validation is on the route
    // level.
    const jobId = await jobHandler.createJobHandler(
      {},
      {
        title: 'job title',
      }
    );

    expect(jobId).toBeDefined();
    expect(jobId).toBe(uuid);
  });

  it('should be able to get all jobs', async () => {
    getAllJobs.mockReturnValueOnce([
      {
        title: 'tittle 1',
        created_at: '2022-07-29T06:51:39.689Z',
        updated_at: '2022-07-29T06:51:39.689Z',
      },
      {
        title: 'tittle 2',
        created_at: '2022-07-29T06:51:39.689Z',
        updated_at: '2022-07-29T06:51:39.689Z',
      },
    ]);

    const jobsList = await jobHandler.getAllJobsHandler({}, 1, 0);

    expect(jobsList.length).toBe(2);
    expect(jobsList[0].created_at).toBe('2022-07-29');
    expect(jobsList[0].updated_at).toBe('2022-07-29');
  });
});
