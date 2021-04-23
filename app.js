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
  if (d < radius) {
    return {
      idCode: hotel.ridCode,
      countryCode: hotel.countryCode,
      localRating: hotel.localRating,
      address: hotel.address,
      commercialName: hotel.commercialName,
      distance: parseFloat(d).toFixed(),
    };
  }
};


/**
 *
 * @param {String} ridCode - reference de l'hotel
 * @returns {Array} - liste des offres
 */
const getPriceOffersByHotel = (ridCode) => {
	return getPrices().find(price => price.ridCode === ridCode);
}

/**
 *
 * @param {Array} Liste des hotels à proximité
 * @return {Object} Liste des offres par ridCode
 */
const aggregateOffersByHotels = (hotelsNearBy) =>
  hotelsNearBy.reduce((acc, hotel) => {
    const priceOffersHotel = getPriceOffersByHotel(hotel.ridCode);
    return {
      ...acc,
      [hotel.ridCode]: priceOffersHotel.offers,
    };
  }, {});

/**
 *
 * @param {Number} lat
 * @param {Number} lng
 * @param {Number} radius
 * @returns list des hôtels autour de moi qui ont un radius spécifique
 */
function findHotelsNearby(lat, lng, radius) {
  // TODO implement me
  return getHotels().filter(radiusHotelFilter(radius, lat, lng));
}

function findHotelNearbyWithBestOffer(lat, lng, radius, date) {
  // TODO implement me
  const hotelsNearBy = findHotelsNearby(lat, lng, radius);
//   console.log(hotelsNearBy, "hotelsNearBy");
  const offersbyHotel = aggregateOffersByHotels(hotelsNearBy);
  console.log(offersbyHotel, "offersbyHotel");
  return null;
}

module.exports = {
  findHotelsNearby: findHotelsNearby,
  findHotelNearbyWithBestOffer: findHotelNearbyWithBestOffer,
};
