function userRepository(db) {
  async function createUser(user) {
    try {
      const { id } = await db.one(
        'INSERT INTO users_table(first_name, middle_name, last_name, password, email) VALUES($1, $2, $3, $4, $5) RETURNING id',
        [
          user.first_name,
          user.middle_name,
          user.last_name,
          user.password,
          user.email,
        ]
      );

      return id;
    } catch (error) {
      throw new Error('Password and email is required!');
    }
  }

  async function getUserById(userId) {
    try {
      const user = await db.one(
        'SELECT * FROM users_table WHERE users_table.id = $1',
        [userId]
      );

      return user;
    } catch (error) {
      throw new Error(`user id ${userId} does not exist!`);
    }
  }

  return { createUser, getUserById };
}

module.exports = userRepository;
