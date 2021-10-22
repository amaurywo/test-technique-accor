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
      hotel.distance = distance;
      delete hotel.latitude;
      delete hotel.longitude;
      hotels.push(hotel);
    }
    return hotels;
  }, []);
}

function findHotelNearbyWithBestOffer(lat, lng, radius, date) {
  // TODO implement me
  return null;
}

module.exports = {
  findHotelsNearby: findHotelsNearby,
  findHotelNearbyWithBestOffer: findHotelNearbyWithBestOffer,
};
