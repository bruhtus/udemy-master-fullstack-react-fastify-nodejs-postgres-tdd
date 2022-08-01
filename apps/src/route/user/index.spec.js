const Fastify = require('fastify');
const userRoute = require('./index');
const userHandler = require('../../handler/user.handler');
const { v4: uuidv4 } = require('uuid');

jest.mock('../../handler/user.handler');

describe('user route', () => {
  const createUserHandler = jest.fn();
  const getUserByIdHandler = jest.fn();
  const getUserByEmailHandler = jest.fn();

  userHandler.mockImplementation(() => {
    return {
      createUserHandler,
      getUserByIdHandler,
      getUserByEmailHandler,
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
    createUserHandler.mockReturnValueOnce(uuid);

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
    createUserHandler.mockReturnValueOnce(uuid);

    const { first_name: _, last_name: __, ...request } = user;

    const postResponse = await app.inject({
      method: 'POST',
      url: 'api/v1/user',
      payload: request,
    });

    expect(postResponse.statusCode).toBe(400);
  });

  it('should be able to reject incorrect format email request', async () => {
    createUserHandler.mockReturnValueOnce(uuid);

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

  it('should be able to get user by id', async () => {
    const { first_name: _, last_name: __, password: ___, ...userData } = user;

    const data = {
      ...userData,
      id: uuid,
      name: `${user.first_name} ${user.last_name}`,
    };

    getUserByIdHandler.mockReturnValueOnce(data);

    const getByIdResponse = await app.inject({
      method: 'GET',
      url: `api/v1/user/${uuid}`,
    });

    expect(getByIdResponse.json().data).toMatchObject(data);
    expect(getByIdResponse.statusCode).toBe(200);
  });

  // TODO: make unit test case for login endpoint.
  // it('should be able to get user by email', async () => {
  //   const data = {
  //     ...user,
  //     id: uuid,
  //   };

  //   getUserByEmailHandler.mockReturnValueOnce(data);

  //   const loginResponse = await app.inject({
  //     method: 'POST',
  //     url: 'api/v1/user/login',
  //     payload: {
  //       email: user.email,
  //       password: user.password,
  //     },
  //   });

  //   console.log(loginResponse.json());
  //   expect(loginResponse.statusCode).toBe(200);
  // });

  it('should be able to reject if user id params not valid', async () => {
    const { first_name: _, last_name: __, password: ___, ...userData } = user;

    const data = {
      ...userData,
      id: uuid,
      name: `${user.first_name} ${user.last_name}`,
    };

    getUserByIdHandler.mockReturnValueOnce(data);

    const getByIdResponse = await app.inject({
      method: 'GET',
      url: 'api/v1/user/not-uuid',
    });

    expect(getByIdResponse.json().message).toBe(
      'params/id must match format "uuid"'
    );
    expect(getByIdResponse.statusCode).toBe(400);
  });
});
