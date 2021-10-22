const app = require("./app");

describe("App", () => {
  test("findHotelsNearby() returns an empty array when no args are passed", () => {
    expect(app.findHotelsNearby().length).toBe(0);
  });
  test("when user is at the center of Paris, some hotels are found", () => {
    const hotelsNearParis = app.findHotelsNearby(48.856564, 2.351711, 2000);

    expect(hotelsNearParis.length).toBeGreaterThan(0);
    for (const hotel of hotelsNearParis) {
      expect(hotel).toHaveProperty("distance");
      expect(hotel.distance).toBeLessThanOrEqual(2000);
    }
  });
  test("findHotelNearbyWithBestOffer() returns null when no args are passed", () => {
    expect(app.findHotelNearbyWithBestOffer()).toBeNull();
  });
  test("when user is at the center of Paris, and looks for the cheapest offer in hotels around for the date 11/01/2021, an hotel is found", () => {
    expect(
      app.findHotelNearbyWithBestOffer(48.856564, 2.351711, 2000, "11/01/2021")
        .ridCode
    ).toBeDefined();
  });
});
