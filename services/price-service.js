const PRICES = require("./data/prices.json").prices;
let priceMin = null;
let offersMinPrice = [];

const getPrices = () => {
  return PRICES;
};

const getHotelsWithBestPriceByFare = (date, fare) => {
  const prices = getPrices();
  priceMin = null;
  offersMinPrice = [];
  let pricesLength = prices.length;
  let fareOption;

  for (let i = 0; i < pricesLength; ++i) {
    let offers = prices[i].offers;
    let offersLength = offers.length;

    for (let j = 0; j < offersLength; ++j) {
      if (fare === "ALL") {
		if (offers[j].date === date) {
			getPriceMin( offers[j].price, offers[j].date, offers[j].fare, prices[i].ridCode );
		  }
      } else {
        if (offers[j].date === date && offers[j].fare === fare) {
          getPriceMin( offers[j].price, offers[j].date, offers[j].fare, prices[i].ridCode );
        }
      }
    }
  }

  return offersMinPrice;
};

const getPriceMin = (price, date, fare, ridCode) => {
  if (priceMin === null) {
    // case 0
    priceMin = price;
    offersMinPrice.push({
      ridCode, offre: { date, fare, price }
    });
  } else {
    // other cases
    if (price === priceMin) {
      offersMinPrice.push({
        ridCode, offre: { date, fare, price }
      });
    } else if (price < priceMin) {
      priceMin = price;
      offersMinPrice = [];
      offersMinPrice.push({
        ridCode, offre: { date, fare, price }
      });
    }
  }
};

module.exports = {
  getPrices: getPrices,
  getHotelsWithBestPriceByFare: getHotelsWithBestPriceByFare,
};
