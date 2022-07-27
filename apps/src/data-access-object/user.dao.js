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

  return { createUser };
}

module.exports = userRepository;
