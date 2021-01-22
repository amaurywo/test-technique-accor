const USERS = require('./data/users.json').users;

const getUsers = () => {
	return USERS;
}

const userIsSubscribed = (userId) => {
	return users = getUsers().find(ele => ele.id === userId).subscribed;
}


module.exports = {
	getUsers: getUsers,
	userIsSubscribed: userIsSubscribed
}