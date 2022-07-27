const Fastify = require('fastify');
const userRepository = require('./user.dao');
const dbPlugin = require('../plugin/database');
const { v4: uuidv4 } = require('uuid');

describe('user repository', () => {
  let app;

  beforeAll(async () => {
    app = Fastify();
    app.register(dbPlugin);

    await app.ready();
  });

  // FIXME:
  // this is dangerous because it will delete all the data in database even
  // the seeder data.
  // because this is supposed to be a learning material, i will leave it here.
  // need to find a better solution later.
  beforeEach(async () => {
    await app.db.query('DELETE FROM jobs_table');
    await app.db.query('DELETE FROM users_table');
  });

  it('should be able to create user in db', async () => {
    const user = {
      first_name: 'The',
      last_name: 'Primeagen',
      password: 'beat_me_daddy',
      email: 'bunspreader@dox-me-daddy.com',
    };

    const { createUser } = userRepository(app.db);
    const userId = await createUser(user);

    expect(userId).toBeDefined();
  });

  it('should throw error if required field not present', async () => {
    const user = {
      first_name: 'The',
      last_name: 'Primeagen',
    };

    const { createUser } = userRepository(app.db);

    expect.assertions(1);
    await expect(createUser(user)).rejects.toThrow(
      Error('Password and email is required!')
    );
  });

  it('should be able to get user by id', async () => {
    const user = {
      first_name: 'The',
      last_name: 'Primeagen',
      password: 'beat_me_daddy',
      email: 'bunspreader@dox-me-daddy.com',
    };

    const { createUser, getUserById } = userRepository(app.db);
    const userId = await createUser(user);
    const getByIdResponse = await getUserById(userId);

    expect(getByIdResponse).toBeDefined();
    expect(getByIdResponse).toMatchObject(user);
  });

  it('should throw error when user does not exist', async () => {
    const { getUserById } = userRepository(app.db);
    const userId = uuidv4();

    expect.assertions(1);
    await expect(getUserById(userId)).rejects.toThrow(
      Error(`user id ${userId} does not exist!`)
    );
  });
});
