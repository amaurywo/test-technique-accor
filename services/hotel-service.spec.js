const hotelService = require('./hotel-service');

describe('HotelService', () => {
  test('getHotels() returns all hotels', () => {
    expect(hotelService.getHotels()).toBeDefined();
    expect(hotelService.getHotels().length).toBe(248);
  })
});