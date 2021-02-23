const PRICES = require('./data/prices.json').prices;

const { sortBy } = require('./helper');

const sortByPrice = sortBy('price');

const sortByPriceOfOffer = sortBy('offer.price');

const getPrices = () => PRICES;

const isTruthy = (value) => !!value;

const getHotelBestPriceForDate = (hotelRidCode, date) => {
  const pricesForDate = PRICES
    .filter(
      (price) => hotelRidCode === price.ridCode
        && price.offers.some((offer) => offer.date === date),
    );

  const bestPricesForDate = pricesForDate
    .map(
      (price) => price.offers
        .slice() // copy to mutate it freely
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
