const Fastify = require('fastify');
const userRoute = require('./index');
const userHandler = require('../../handler/user.handler');
const { v4: uuidv4 } = require('uuid');

jest.mock('../../handler/user.handler');

describe('user route', () => {
  const createUserHandler = jest.fn();
  const getUserByIdHandler = jest.fn();

  userHandler.mockImplementation(() => {
    return {
      createUserHandler,
      getUserByIdHandler,
    };
  });

  const uuid = uuidv4();

  const user = {
    first_name: 'The',
    last_name: 'Primeagen',
    password: 'beat_me_daddy',
    email: 'bunspreader@dox-me-daddy.com',
  };

  let app;

  beforeAll(async () => {
    app = Fastify();
    app.register(userRoute, { prefix: 'api/v1/user' });

    await app.ready();
  });

  it('should be able to create user', async () => {
    // TODO: try out with mockReturnValueOnce().
    createUserHandler.mockImplementation(() => uuid);

    const postResponse = await app.inject({
      method: 'POST',
      url: 'api/v1/user',
      payload: user,
    });

    expect(postResponse.json().data.id).toBeDefined();
    expect(postResponse.json().data.id).toBe(uuid);
    expect(postResponse.statusCode).toBe(201);
  });

  it('should be able to reject if request is invalid', async () => {
    // TODO: try out with mockReturnValueOnce().
    createUserHandler.mockImplementation(() => {
      throw new Error('Invalid data');
    });

    const postResponse = await app.inject({
      method: 'POST',
      url: 'api/v1/user',
      payload: user,
    });

    expect(postResponse.json().message).toBe('Invalid data');
    expect(postResponse.statusCode).toBe(400);
  });

  it('should be able to reject if required property empty', async () => {
    // TODO: try out with mockReturnValueOnce().
    createUserHandler.mockImplementation(() => uuid);

    const { first_name: _, ...request } = user;

    const postResponse = await app.inject({
      method: 'POST',
      url: 'api/v1/user',
      payload: request,
    });

    expect(postResponse.statusCode).toBe(400);
  });

  it('should be able to reject incorrect format email request', async () => {
    // TODO: try out with mockReturnValueOnce().
    createUserHandler.mockImplementation(() => uuid);

    // Ref: https://stackoverflow.com/a/53753294
    const { first_name: _, ...request } = user;

    const postResponse = await app.inject({
      method: 'POST',
      url: 'api/v1/user',
      payload: {
        ...request,
        email: 'email',
      },
    });

    expect(postResponse.statusCode).toBe(400);
  });
});
