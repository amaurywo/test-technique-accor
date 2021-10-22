const priceService = require("./price-service");
const app = require("../app");
const hotelsNearParis = app.findHotelsNearby(48.856564, 2.351711, 2000);

describe("PriceService", () => {
  test("getPrices() returns all prices", () => {
    expect(priceService.getPrices()).toBeDefined();
    expect(priceService.getPrices().length).toBe(248);
  });
  test("getCheapestHotelByDate() returns null when hotels arg is missing", () => {
    expect(priceService.getCheapestHotelByDate(null, "11/01/2021")).toBeNull();
  });
  test("getCheapestHotelByDate() returns null when date arg is missing", () => {
    expect(
      priceService.getCheapestHotelByDate(hotelsNearParis, null)
    ).toBeNull();
  });
  test("getCheapestHotelByDate() returns null when an empty array is passing for hotels arg", () => {
    expect(priceService.getCheapestHotelByDate([], "11/01/2021")).toBeNull();
  });
  test("getCheapestHotelByDate() returns null when are missing", () => {
    expect(
      priceService.getCheapestHotelByDate(hotelsNearParis, "11/01/2021")
    ).toHaveProperty("ridCode");
    expect(
      priceService.getCheapestHotelByDate(hotelsNearParis, "11/01/2021").ridCode
    ).toBe("A013");
  });
});
