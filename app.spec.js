const app = require('./app');

describe('App', () => {
  test('findHotelsNearby() returns an empty array when no args are passed', () => {
    expect(app.findHotelsNearby().length).toBe(0);
  });
  test('when user is at the center of Paris, some hotels are found', () => {
    expect(app.findHotelsNearby(48.856564, 2.351711, 2000).length).toBeGreaterThan(0);
  });
  test('findHotelNearbyWithBestOffer() returns null when no args are passed', () => {
    expect(app.findHotelNearbyWithBestOffer()).toBeNull();
  });
  test('when user is at the center of Paris, and looks for the cheapest offer in hotels around for the date 11/01/2021, an hotel is found', () => {
    expect(app.findHotelsNearby(48.856564, 2.351711, 2000, '11/01/2021').ridCode).toBeDefined();
  });
  test('findHotelNearbyWithBestOfferForUser() returns null when no args are passed', () => {
    expect(app.findHotelNearbyWithBestOfferForUser()).toBeNull();
  });
  test('when a subscribed user is at the center of Paris, and looks for the cheapest offer in hotels around for the date 11/01/2021, an hotel is found', () => {
    expect(app.findHotelsNearby(48.856564, 2.351711, 2000, '11/01/2021', 2).ridCode).toBeDefined();
  });
});
