const userService = require("./services/user-service");
const { getHotels } = require("./services/hotel-service");

const {
  hotelDistanceFilter,
  enrichDistanceHotel,
  cleanHotelProperties,
  getBestOfferByDate,
} = require("./libs");
/**
 * @param {Number} lat - coordonnée (latitude)
 * @param {Number} lng - coordonnée (longitude)
 * @param {Number} distance - distance en mètres
 * @returns {Array} - liste d'hotel dans le périmètre souhaité
 */
function findHotelsNearby(lat, lng, distance) {
	return getHotels()
		.map(enrichDistanceHotel(lat, lng))
		.filter(hotelDistanceFilter(distance))
		.map(cleanHotelProperties);
}

/**
 * Retourne la meilleur offre du jour dans un rayon de n mètres
 * @param {Number} lat
 * @param {Number} lng
 * @param {Number} distance
 * @param {String} date
 * @returns {Object|null}
 */
function findHotelNearbyWithBestOffer(lat, lng, distance, date) {
	const hotelsNearBy = findHotelsNearby(lat, lng, distance);

	const bestOffer = getBestOfferByDate(hotelsNearBy, date);

    return bestOffer || null;
}


module.exports = {
  findHotelsNearby,
  findHotelNearbyWithBestOffer,
};
