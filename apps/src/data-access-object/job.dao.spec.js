const Fastify = require('fastify');
const jobRepository = require('./job.dao');
const userRepository = require('./user.dao');
const dbPlugin = require('../plugin/database');

describe('job repository', () => {
  let app;
  let userId;
  let job;

  async function getUserId() {
    const user = {
      first_name: 'yalord',
      last_name: 'saveme',
      password: 'bentarlagikerja',
      email: 'email@jobs.wtf',
    };

    const { createUser } = userRepository(app.db);
    const id = await createUser(user);

    return id;
  }

  // Ref: https://stackoverflow.com/a/3674559
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  beforeAll(async () => {
    app = Fastify();
    app.register(dbPlugin);

    await app.ready();

    userId = await getUserId();

    job = {
      title: 'test job title',
      description: 'test job description',
      skills: 'test job skill',
      min_budget: 69,
      max_budget: 69420,
      expired_at: `${tomorrow.getFullYear()}-${tomorrow.getMonth()}-${tomorrow.getDate()}`,
      user_id: userId,
    };
  });

  // Note:
  // delete all the items in database after running the test.
  // this is so that any test case do not depend on another test case.
  afterEach(async () => {
    await app.db.query('DELETE FROM jobs_table');
  });

  it('should be able to create data in db', async () => {
    const { createJob } = jobRepository(app.db);
    const jobId = await createJob(job);

    expect(jobId).toBeDefined();
  });

  it('should be able to throw error if user does not exist', async () => {
    const jobWithoutUser = {
      ...job,
      user_id: null,
    };

    const { createJob } = jobRepository(app.db);

    expect.assertions(1);
    await expect(createJob(jobWithoutUser)).rejects.toThrow(
      Error('Failed to create a job')
    );
  });

  it('should be able to get all jobs from db', async () => {
    const { createJob, getAllJobs } = jobRepository(app.db);

    await createJob({
      ...job,
      title: 'test job title get all - 1',
    });

    await createJob({
      ...job,
      title: 'test job title get all - 2',
    });

    // Note: get 1 item and skip 0 item.
    const firstJobs = await getAllJobs(1, 0);

    expect(firstJobs.length).toBe(1);
    expect(firstJobs[0].title).toBeDefined();
    expect(firstJobs[0].title).toBe('test job title get all - 1');

    // Note: get 1 item and skip 1 item.
    const secondJobs = await getAllJobs(1, 1);

    expect(secondJobs.length).toBe(1);
    expect(secondJobs[0].title).toBeDefined();
    expect(secondJobs[0].title).toBe('test job title get all - 2');
  });

  it('should be able to exclude expired jobs from get all', async () => {
    const { createJob, getAllJobs } = jobRepository(app.db);

    await createJob({
      ...job,
      title: 'test job title without expired date',
    });

    await createJob({
      ...job,
      title: 'test job title with expired date',
      expired_at: `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`,
    });

    // Note: get 2 item and skip 0 item.
    const jobs = await getAllJobs(2, 0);

    expect(jobs.length).toBe(1);
    expect(jobs[0].title).toBeDefined();
    expect(jobs[0].title).toBe('test job title without expired date');
  });
});