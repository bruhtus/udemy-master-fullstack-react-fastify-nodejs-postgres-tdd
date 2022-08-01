const Fastify = require('fastify');
const luxon = require('luxon');
const { v4: uuidv4 } = require('uuid');
const jobRoute = require('./index');
const jobHandler = require('../../handler/job.handler');
const authenticate = require('../../plugin/authentication');

describe('job route', () => {
  const createJobHandler = jest.spyOn(jobHandler, 'createJobHandler');
  const getAllJobsHandler = jest.spyOn(jobHandler, 'getAllJobsHandler');

  const uuid = uuidv4();

  const tomorrow = luxon.DateTime.now()
    .plus({ days: 1 })
    .toFormat('yyyy-MM-dd');

  const yesterday = luxon.DateTime.now()
    .plus({ days: -1 })
    .toFormat('yyyy-MM-dd');

  const job = {
    title: 'test title',
    description: 'test description',
    skills: 'test skills',
    min_budget: 69,
    max_budget: 69420,
    expired_at: tomorrow,
    user_id: uuid,
  };

  let app;

  beforeAll(async () => {
    app = Fastify();
    app.register(jobRoute, { prefix: 'api/v1/job' });
    app.register(authenticate);

    await app.ready();
  });

  it('should be able to create job', async () => {
    createJobHandler.mockReturnValueOnce(uuid);

    const postResponse = await app.inject({
      method: 'POST',
      url: 'api/v1/job',
      payload: job,
    });

    expect(postResponse.json().data.id).toBeDefined();
    expect(postResponse.json().data.id).toBe(uuid);
    expect(postResponse.statusCode).toBe(201);
  });

  it('should be able to reject if missing required', async () => {
    createJobHandler.mockReturnValueOnce(uuid);

    const { title: _, ...missingTitleJob } = job;

    const postResponse = await app.inject({
      method: 'POST',
      url: 'api/v1/job',
      payload: missingTitleJob,
    });

    expect(postResponse.statusCode).toBe(400);
  });

  it('should be able to reject if expired less than or equal today', async () => {
    createJobHandler.mockReturnValueOnce(uuid);

    const incorrectExpiredDateJob = {
      ...job,
      expired_at: yesterday,
    };

    const postResponse = await app.inject({
      method: 'POST',
      url: 'api/v1/job',
      payload: incorrectExpiredDateJob,
    });

    expect(postResponse.statusCode).toBe(400);
  });

  it('should be able to get jobs list', async () => {
    getAllJobsHandler.mockReturnValueOnce([job]);

    // Note: add a fake JWT token.
    const token = app.jwt.sign({ foo: 'bar' });

    const getManyResponse = await app.inject({
      method: 'GET',
      url: 'api/v1/job',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      query: { limit: 1, offset: 0 },
    });

    expect(getManyResponse.statusCode).toBe(200);
  });

  it('should be able to reject request if query is not present', async () => {
    getAllJobsHandler.mockReturnValueOnce([job]);

    const getManyResponse = await app.inject({
      method: 'GET',
      url: 'api/v1/job',
    });

    expect(getManyResponse.statusCode).toBe(400);
  });
});
