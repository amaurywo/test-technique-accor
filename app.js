const userService = require("./services/user-service");
const { getHotels } = require("./services/hotel-service");
const { getPrices } = require("./services/price-service");
const { distance } = require("./services/helper");

/**
 *
 * @param {Number} radius
 * @param {Number} lat
 * @param {Number} lng
 * @returns
 */
const radiusHotelFilter = (radius, lat, lng) => (hotel) => {
  const d = distance(lat, lng, hotel.latitude, hotel.longitude);
  return d < radius;
};

/**
 *
 * @param {Number} lat
 * @param {Number} lng
 * @param {Number} radius
 * @returns list of hotels around specific radius
 */
function findHotelsNearby(lat, lng, radius) {
  // TODO implement me
  return getHotels().filter(radiusHotelFilter(radius, lat, lng));
}

function findHotelNearbyWithBestOffer(lat, lng, radius, date) {
  // TODO implement me
  return null;
}

module.exports = {
  findHotelsNearby: findHotelsNearby,
  findHotelNearbyWithBestOffer: findHotelNearbyWithBestOffer,
};
