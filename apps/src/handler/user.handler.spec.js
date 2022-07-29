const userHandler = require('./user.handler');
const userDao = require('../data-access-object/user.dao');
const { v4: uuidv4 } = require('uuid');

// Note:
// jest.mock return an object instead of a function.
// meanwhile .mockImplementation() return a function.
// console log userDao to check the result of jest mock.
// jest.mock('../data-access-object/user.dao', () => {
//   return {
//     createUser: jest.fn(),
//     getUserById: jest.fn(),
//   };
// });

jest.mock('../data-access-object/user.dao');

describe('user handler', () => {
  const createUser = jest.fn();
  const getUserById = jest.fn();

  userDao.mockImplementation(() => {
    return {
      createUser,
      getUserById,
    };
  });

  const handler = userHandler({});

  const user = {
    first_name: 'The',
    last_name: 'Primeagen',
    password: 'beat_me_daddy',
    email: 'bunspreader@dox-me-daddy.com',
  };

  const uuid = uuidv4();

  it('should be able to create user', async () => {
    createUser.mockReturnValueOnce(uuid);

    const userId = await handler.createUserHandler(user);

    expect(createUser).toBeCalledWith(user);
    expect(userId).toBe(uuid);
  });

  it('should be able to get user by id', async () => {
    const response = {
      ...user,
      id: uuid,
    };

    getUserById.mockReturnValueOnce(response);

    const userData = await handler.getUserByIdHandler(uuid);

    expect(getUserById).toBeCalledTimes(1);
    expect(userData).toMatchObject({
      id: response.id,
      name: `${response.first_name} ${response.last_name}`,
      email: user.email,
    });
  });

  it('should be able to return the correct name when get by id', async () => {
    const responseWithMiddleName = {
      ...user,
      id: uuid,
      middle_name: 'Yayayaya',
    };

    getUserById.mockReturnValueOnce(responseWithMiddleName);

    const userWithMiddleName = await handler.getUserByIdHandler(uuid);

    expect(getUserById).toBeCalled();
    expect(userWithMiddleName).toMatchObject({
      id: uuid,
      name: `${responseWithMiddleName.first_name} ${responseWithMiddleName.middle_name} ${responseWithMiddleName.last_name}`,
      email: user.email,
    });

    // Ref: https://stackoverflow.com/a/53753294
    const { last_name: _, ...responseWithoutLastName } = responseWithMiddleName;

    getUserById.mockReturnValueOnce(responseWithoutLastName);

    const userWithoutLastName = await handler.getUserByIdHandler(uuid);

    expect(getUserById).toBeCalled();
    expect(userWithoutLastName).toMatchObject({
      id: uuid,
      name: `${responseWithoutLastName.first_name} ${responseWithoutLastName.middle_name}`,
      email: user.email,
    });

    const responseWithNullMiddleName = {
      ...user,
      id: uuid,
      middle_name: null,
    };

    getUserById.mockReturnValueOnce(responseWithNullMiddleName);

    const userWithNullMiddleName = await handler.getUserByIdHandler(uuid);

    expect(getUserById).toBeCalled();
    expect(userWithNullMiddleName).toMatchObject({
      id: uuid,
      name: `${responseWithNullMiddleName.first_name} ${responseWithNullMiddleName.last_name}`,
      email: user.email,
    });
  });
});
