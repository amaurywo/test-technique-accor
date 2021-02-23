const priceService = require('./price-service');

describe('PriceService', () => {
  test('getPrices() returns all prices', () => {
    expect(priceService.getPrices()).toBeDefined();
    expect(priceService.getPrices().length).toBe(248);
  });

  test('getPricesForDate() returns best price of each hotel for specific date and an unsubscribed user', () => {
    // Given
    const hotelsRidCodes = ['A357', '1610', '9685'];
    const date = '11/01/2021';

    // When
    const hotelsPricesForDate = hotelsRidCodes.map(
      (ridCode) => priceService.getHotelBestPriceForDate(ridCode, date),
    );

    // Then
    expect(hotelsPricesForDate).toBeDefined();
    expect(hotelsPricesForDate.length).toBe(3);
    expect(hotelsPricesForDate[1].price).toBe(86);
  });
  test('getPricesForDate() returns best price of each hotel for specific date and a subscribed user', () => {
    // Given
    const hotelsRidCodes = ['A357', '1610', '9685'];
    const date = '11/01/2021';
    const isSubscribed = true;

    // When
    const hotelsPricesForDate = hotelsRidCodes.map(
      (ridCode) => priceService.getHotelBestPriceForDate(ridCode, date, isSubscribed),
    );

    // Then
    expect(hotelsPricesForDate).toBeDefined();
    expect(hotelsPricesForDate.length).toBe(3);
    expect(hotelsPricesForDate[1].price).toBe(78);
  });
});
