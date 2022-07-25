const build = require('./app');

describe('app route', () => {
  let app;

  beforeAll(() => {
    app = build();
  });

  afterAll(async () => {
    await app.close();
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
});
