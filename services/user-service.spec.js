const userService = require('./user-service');

describe('UserService', () => {
  test('getUsers() returns all users', () => {
    expect(userService.getUsers()).toBeDefined();
    expect(userService.getUsers().length).toBe(10);
  });

  test('getUserById() return only one user', () => {
    const user = userService.getUserById(1);
    expect(user).toBeDefined();
    expect(user.id).toBe(1);
  });
});
