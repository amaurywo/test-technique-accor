const { getPrices } = require("../services/price-service");
const helpers = require("../services/helper");

/**
 * @param {Number} radius - distance en mètres
 * @param {Number} lat - coordonnée (latitude)
 * @param {Number} lng - coordonnée (longitude)
 * @returns {function(*): boolean}
 */
const hotelDistanceFilter = (distance) => (hotel) => hotel.distance < distance;

const sortByPriceAsc = (prev, next) => {
  if (prev.offer.price < next.offer.price) {
    return -1;
  }
  if (prev.offer.price > next.offer.price) {
    return 1;
  }

  return 0;
};

/**
 * Tri croissant de toutes les offres du jour et retourne le 1er élément (offre la moins chère)
 * @param {Array} hotelsOffersByDate
 * @returns {Array}
 */
const getBestOffer = (offers) => offers.sort(sortByPriceAsc).slice(0, 1);

const enrichDistanceHotel = (lat, lng) => (hotel) => ({
  ...hotel,
  distance: Math.floor(
    helpers.distance(lat, lng, hotel.latitude, hotel.longitude)
  ),
});

const cleanHotelProperties = ({
  ridCode,
  countryCode,
  localRating,
  address,
  commercialName,
  distance,
}) => ({
  ridCode,
  countryCode,
  localRating,
  address,
  commercialName,
  distance,
});

const getHotelOffersByDate = (ridCode, date) => {
  const { offers } = getPrices().find((price) => price.ridCode === ridCode);
  return offers.filter((offer) => offer.date === date);
};

/**
 * WARNING Need Node v11 minimum due to flatMap iterator !
 * @param hotelsNearBy
 * @param date
 * @returns {any[]}
 */
const duplicateHotelsByOffers = (hotelsNearBy, date) =>
  hotelsNearBy.flatMap((hotel) => {
    return getHotelOffersByDate(hotel.ridCode, date).map((offer) => {
      return {
        ...hotel,
        offer,
      };
    });
  });

const getBestOfferByDate = (hotelsNearBy, date) => {
  const hotelsWithOffer = duplicateHotelsByOffers(hotelsNearBy, date);

  const [bestOffer] = getBestOffer(hotelsWithOffer);

  return bestOffer;
};

module.exports = {
  hotelDistanceFilter,
  enrichDistanceHotel,
  cleanHotelProperties,
  getBestOfferByDate,
};
