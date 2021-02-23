const userService = require('./services/user-service');
const hotelService = require('./services/hotel-service');
const priceService = require('./services/price-service');
const helper = require('./services/helper');

function findHotelsNearby(lat, lng, radius = 2000) {
  if (arguments.length === 0) {
    return [];
  }
  const result = hotelService.getHotels()
    .filter((hotel) => helper.distance(lat, lng, hotel.latitude, hotel.longitude) <= radius)
    .map((hotel) => ({
      ...hotel,
      distance: Math.round(helper.distance(lat, lng, hotel.latitude, hotel.longitude)),
    })); // Maybe use reduce instead of filter+map if performance is an issue?

  return result;
}

function findHotelNearbyWithBestOffer(lat, lng, radius, date) {
  if (arguments.length === 0) {
    return null;
  }

  // TODO implement me
  return null;
}

function findHotelNearbyWithBestOfferForUser(lat, lng, radius, date, userId) {
  if (arguments.length === 0) {
    return null;
  }
  // TODO implement me
  return null;
}

module.exports = {
  findHotelsNearby,
  findHotelNearbyWithBestOffer,
  findHotelNearbyWithBestOfferForUser,
};
