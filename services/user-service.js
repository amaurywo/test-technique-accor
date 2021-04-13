const USERS = require('./data/users.json').users;

const getUsers = () => {
	return USERS;
}

module.exports = {
	getUsers: getUsers
}