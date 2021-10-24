const priceService = require("./price-service");
const app = require("../app");
const hotels = app.findHotelsNearby(48.856564, 2.351711, 2000, "11/01/2021");

describe("PriceService", () => {
  test("getPrices() returns all prices", () => {
    expect(priceService.getPrices()).toBeDefined();
    expect(priceService.getPrices().length).toBe(248);
  });
  test("getPriceByDate() returns null when hotels arg is missing", () => {
    expect(priceService.getPriceByDate(null, "11/01/2021")).toBeNull();
  });
  test("getPriceByDate() returns null when date arg is missing", () => {
    expect(priceService.getPriceByDate(hotels, null)).toBeNull();
  });
  test("getPriceByDate() returns null when an empty array is passing for hotels arg", () => {
    expect(priceService.getPriceByDate([], "11/01/2021")).toBeNull();
  });
  test("getPriceByDate() returns an array of prices for a given date with fare equal to STANDARD", () => {
    const result = priceService.getPriceByDate(hotels, "11/01/2021");
    expect(result).toHaveLength(19);
  });
  test("sortByPriceAndDistance() returns null when no args was provided", () => {
    expect(priceService.sortByPriceAndDistance()).toBeNull();
  });
  test("sortByPriceAndDistance() returns an array sorted by prices and distance", () => {
    const hotelsPrices = priceService.sortByPriceAndDistance(
      priceService.getPriceByDate(hotels, "11/01/2021")
    );
    expect(priceService.sortByPriceAndDistance(hotelsPrices)).toBeDefined();
    expect(priceService.sortByPriceAndDistance(hotelsPrices)[0].ridCode).toBe(
      "A013"
    );
  });
  test("getCheapestPrice() returns an null when no args was provided", () => {
    expect(priceService.getCheapestPrice()).toBeNull();
  });
  test("getCheapestPrice() returns a hotel with the cheapest price", () => {
    const hotelsPrices = [
      {
        ridCode: "2897",
        offer: { date: "11/01/2021", fare: "STANDARD", price: 122 },
      },
      {
        ridCode: "9688",
        offer: { date: "11/01/2021", fare: "STANDARD", price: 132 },
      },
    ];
    expect(priceService.getCheapestPrice(hotelsPrices)).toBeDefined();
    expect(priceService.getCheapestPrice(hotelsPrices).ridCode).toBe("2897");
    expect(priceService.getCheapestPrice(hotelsPrices).offer).toMatchObject(
      hotelsPrices[0].offer
    );
  });
  test("getCheapestPrice() returns the nearest hotel with the cheapest price", () => {
    const hotelsPrices = [
      {
        // Nearest hotel
        ridCode: "2897",
        offer: { date: "11/01/2021", fare: "STANDARD", price: 122 },
      },
      {
        ridCode: "9688",
        offer: { date: "11/01/2021", fare: "STANDARD", price: 122 },
      },
    ];
    expect(priceService.getCheapestPrice(hotelsPrices)).toBeDefined();
    expect(priceService.getCheapestPrice(hotelsPrices).ridCode).toBe("2897");
    expect(priceService.getCheapestPrice(hotelsPrices).offer).toMatchObject(
      hotelsPrices[0].offer
    );
  });
});
