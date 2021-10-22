const userService = require("./services/user-service");
const hotelService = require("./services/hotel-service");
const priceService = require("./services/price-service");
const helper = require("./services/helper");

function findHotelsNearby(lat, lng, radius) {
  if (!lat || !lng || !radius) {
    return [];
  }
  return hotelService.getHotels().reduce((hotels, hotel) => {
    const distance = helper.distance(lat, lng, hotel.latitude, hotel.longitude);
    if (distance <= radius) {
      const result = {
        distance: parseInt(distance.toFixed()),
        ...hotel,
      };
      delete result.latitude;
      delete result.longitude;
      hotels.push(result);
    }
    return hotels;
  }, []);
}

function findHotelNearbyWithBestOffer(lat, lng, radius, date) {
  if (!lat || !lng || !radius || !date) {
    return null;
  }
  const hotels = findHotelsNearby(lat, lng, radius);
  const prices = priceService.getCheapestHotelByDate(hotels, date, "STANDARD");
  const result = hotels.find((hotel) => (hotel.ridCode = prices.ridCode));
  return {
    ...result,
    offer: prices.offer,
  };
}

module.exports = {
  findHotelsNearby: findHotelsNearby,
  findHotelNearbyWithBestOffer: findHotelNearbyWithBestOffer,
};
