const PRICES = require('./data/prices.json').prices;

const { sortBy } = require('./helper');

const sortByPrice = sortBy('price');

const sortByPriceOfOffer = sortBy('offer.price');

const getPrices = () => PRICES;

const isTruthy = (value) => !!value;

const getHotelBestPriceForDate = (hotelRidCode, date, isSubscribed = false) => {
  const pricesForDate = PRICES
    .filter(
      (price) => hotelRidCode === price.ridCode
        && price.offers.some((offer) => offer.date === date && (isSubscribed ? true : offer.fare !== 'SPECIAL_OFFER')),
    );

  const bestPricesForDate = pricesForDate
    .map(
      (price) => price.offers
        .filter((offer) => (isSubscribed ? true : offer.fare !== 'SPECIAL_OFFER'))
        .sort(sortByPrice)
        .shift(),
    )
    .filter(isTruthy);

  return bestPricesForDate
    .sort(sortByPriceOfOffer)
    .shift();
};

module.exports = {
  getPrices,
  getHotelBestPriceForDate,
};
