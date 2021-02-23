const USERS = require('./data/users.json').users;

const getUsers = () => USERS;

const getUserById = (id) => USERS.find((user) => user.id === id);

module.exports = {
  getUsers,
  getUserById,
};
