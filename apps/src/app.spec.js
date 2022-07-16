const build = require('./app');

describe('root route', () => {
  let app;

  beforeEach(() => {
    app = build();
  });

  afterEach(() => {
    app.close();
  });

  it('should return 200 when root route get called', async () => {
    const getResponse = await app.inject({
      url: '/',
    });

    expect(getResponse.json()).toEqual({ hello: 'world' });
    expect(getResponse.statusCode).toBe(200);
  });
});
