const luxon = require('luxon');
const userRepository = require('./data-access-object/user.dao');
const build = require('./app');

describe('app route', () => {
  let app;
  let userId;

  const user = {
    first_name: 'The',
    last_name: 'Primeagen',
    password: 'beat_me_daddy',
    email: 'bunspreader@dox-me-daddy.com',
  };

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

  beforeAll(async () => {
    app = build();

    await app.ready();
    userId = await getUserId();
  });

  afterAll(async () => {
    await app.close();
    await app.db.query(`DELETE FROM jobs_table WHERE user_id = '${userId}'`);
  });

  it('should return 200 when root route get called', async () => {
    const getResponse = await app.inject({
      method: 'GET',
      url: '/',
    });

    expect(getResponse.json()).toEqual({ hello: 'world' });
    expect(getResponse.statusCode).toBe(200);
  });

  it('should return id when temp post and get route called', async () => {
    const postResponse = await app.inject({
      method: 'POST',
      url: '/api/v1/test',
      payload: { title: 'test title' },
    });

    expect(postResponse.json().data.id).toBeDefined();
    expect(postResponse.statusCode).toBe(201);

    const getManyResponse = await app.inject({
      method: 'GET',
      url: '/api/v1/test',
    });

    expect(getManyResponse.statusCode).toBe(200);
  });

  it('should be able to create user in database', async () => {
    const postResponse = await app.inject({
      method: 'POST',
      url: 'api/v1/user',
      payload: user,
    });

    expect(postResponse.json().data.id).toBeDefined();
    expect(postResponse.statusCode).toBe(201);
  });

  it('should be able to get user by id from database', async () => {
    const postResponse = await app.inject({
      method: 'POST',
      url: 'api/v1/user',
      payload: user,
    });

    expect(postResponse.json().data.id).toBeDefined();
    expect(postResponse.statusCode).toBe(201);

    const {
      data: { id },
    } = postResponse.json();

    const getByIdResponse = await app.inject({
      method: 'GET',
      url: `api/v1/user/${id}`,
    });

    expect(getByIdResponse.json().data.id).toBe(id);
    expect(getByIdResponse.statusCode).toBe(200);
  });

  it('should be able to create job', async () => {
    const tomorrow = luxon.DateTime.now()
      .plus({ days: 1 })
      .toFormat('yyyy-MM-dd');

    const job = {
      title: 'test title',
      description: 'test description',
      skills: 'test skills',
      min_budget: 69,
      max_budget: 69420,
      expired_at: tomorrow,
      user_id: userId,
    };

    const postResponse = await app.inject({
      method: 'POST',
      url: 'api/v1/job',
      payload: job,
    });

    expect(postResponse.json().data.id).toBeDefined();
    expect(postResponse.statusCode).toBe(201);
  });

  it('should be able to get jobs list', async () => {
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
});
