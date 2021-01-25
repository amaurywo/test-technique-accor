const userService = require('./user-service');

describe('UserService', () => {
  test('getUsers() returns all users', () => {
    expect(userService.getUsers()).toBeDefined();
    expect(userService.getUsers().length).toBe(10);
  })
});

describe('userIsSubscribed', () => {
  test('userIsSubscribed() return TRUE when the user is subscribed', () => {
    expect(userService.userIsSubscribed(8)).toBeTruthy();
  });
  test('userIsSubscribed() return TRUE when the user is not subscribed', () => {
    expect(userService.userIsSubscribed(3)).toBeDefined();
    expect(userService.userIsSubscribed(1)).not.toBeDefined();
    expect(userService.userIsSubscribed(10)).toBeDefined();
    expect(userService.userIsSubscribed(3)).not.toBeTruthy();
    expect(userService.userIsSubscribed(1)).not.toBeTruthy();
    expect(userService.userIsSubscribed(10)).not.toBeTruthy();
  });
  test('userIsSubscribed() return TRUE when subscribed is undefined', () => {
    expect(userService.userIsSubscribed(1)).not.toBeDefined();
  });
});
