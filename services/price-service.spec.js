const priceService = require('./price-service');

describe('PriceService', () => {
  test('getPrices() returns all prices', () => {
    expect(priceService.getPrices()).toBeDefined();
    expect(priceService.getPrices().length).toBe(248);
  })
});