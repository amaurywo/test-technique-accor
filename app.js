const userService = require('./services/user-service');
const {getHotels} = require('./services/hotel-service');
const {getPrices} = require('./services/price-service');
const {distance} = require('./services/helper');


/**
 *
 * @param {Number} lat
 * @param {Number} lng
 * @param {Number} radius
 * @returns list of hotels around specific radius
 */
function findHotelsNearby(lat, lng, radius) {
    // TODO implement me
	  const allHotels = getHotels().filter((hotel) => {
      const d = distance(lat, lng, hotel.latitude, hotel.longitude);
      console.log(d, 'distance');
      return d < radius;
    });
    console.log(allHotels, "allHotels");
}

function findHotelNearbyWithBestOffer(lat, lng, radius, date) {
    // TODO implement me
    return null;
}

module.exports = {
	findHotelsNearby: findHotelsNearby,
	findHotelNearbyWithBestOffer: findHotelNearbyWithBestOffer
}
