const priceService = require('./price-service');

describe('PriceService', () => {
  test('getPrices() returns all prices', () => {
    expect(priceService.getPrices()).toBeDefined();
    expect(priceService.getPrices().length).toBe(248);
  })
});

describe('getHotelsWithBestPriceByFare', () => {
  test('getHotelsWithBestPriceByFare(date, fare) return hotels with best price by fare STANDARD', () => {
    expect(priceService.getHotelsWithBestPriceByFare("11/01/2021","STANDARD")).toBeDefined();
    expect(priceService.getHotelsWithBestPriceByFare("11/01/2021","STANDARD").length).toBe(2);
  });
});

describe('getHotelsWithBestPriceByFare', () => {
  test('getHotelsWithBestPriceByFare(date, fare) return hotels with best price by fare STANDARD and SPECIAL_OFFER', () => {
    expect(priceService.getHotelsWithBestPriceByFare("11/01/2021")).toBeDefined();
    expect(priceService.getHotelsWithBestPriceByFare("11/01/2021").length).toBe(4);
  });
  test('getHotelsWithBestPriceByFare(date, fare) return 0 hotel when the fare is wrong or/and is out of date range', () => {
    expect(priceService.getHotelsWithBestPriceByFare("11/01/2022","STANDARD").length).toBe(0);
    expect(priceService.getHotelsWithBestPriceByFare("11/01/2021","ANY").length).toBe(0);
    expect(priceService.getHotelsWithBestPriceByFare("11/01/2022","ANY").length).toBe(0);
  });
});
