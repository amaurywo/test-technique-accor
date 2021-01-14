const userService = require('./user-service');

describe('UserService', () => {
  test('getUsers() returns all users', () => {
    expect(userService.getUsers()).toBeDefined();
    expect(userService.getUsers().length).toBe(10);
  })
});