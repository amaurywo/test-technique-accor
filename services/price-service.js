const PRICES = require("./data/prices.json").prices;
let priceMin = null;
let offersMinPrice = [];

const getPrices = () => {
  return PRICES;
};

const getHotelsWithBestPriceByFare = (date, fare) => {
  priceMin = null;
  offersMinPrice = [];

  getPrices().forEach((price) => {
    price.offers.forEach((offer) => {
      if (fare) {
        if (offer.date === date && offer.fare === fare) {
          getPriceMin(offer.price, offer.date, offer.fare, price.ridCode);
        }
      } else {
        if (offer.date === date) {
          getPriceMin(offer.price, offer.date, offer.fare, price.ridCode);
        }
      }
    });
  });

  return offersMinPrice;
};

const getPriceMin = (price, date, fare, ridCode) => {
  if (priceMin === null) {
    // case 0
    priceMin = price;
    offersMinPrice.push({ridCode, offre: { date, fare, price }, });
  } else {
    // other cases
    if (price === priceMin) {
      offersMinPrice.push({ridCode, offre: { date, fare, price },});
    } else if (price < priceMin) {
      priceMin = price;
      offersMinPrice = [];
      offersMinPrice.push({ ridCode, offre: { date, fare, price }, });
    }
  }
};

module.exports = {
  getPrices: getPrices,
  getHotelsWithBestPriceByFare: getHotelsWithBestPriceByFare,
};
