const hotelService = require('./hotel-service');
const hotelPrice = require('./price-service');
const app = require('../app');

describe('HotelService', () => {
  test('getHotels() returns all hotels', () => {
    expect(hotelService.getHotels()).toBeDefined();
    expect(hotelService.getHotels().length).toBe(248);
  })
});

describe('closestHotel', () => {
  const hotelsWithBestPrice = hotelPrice.getHotelsWithBestPriceByFare("11/01/2021","STANDARD");
  const hotelsNear = app.findHotelsNearby(48.856564, 2.351711, 2000);
  const expected = hotelService.closestHotel(hotelsWithBestPrice, hotelsNear);

  test('closestHotel() return the closest hotel', () => {
    expect(hotelService.closestHotel(hotelsWithBestPrice, hotelsNear)).toBeDefined();
    expect(hotelService.closestHotel(hotelsWithBestPrice, hotelsNear)).toEqual(
      expect.arrayContaining(expected),
    );
  })
});