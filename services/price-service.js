const PRICES = require("./data/prices.json").prices;

const getPrices = () => {
  return PRICES;
};

const getPriceByDate = (hotels, date, fare = "STANDARD") => {
  if (!hotels || !hotels.length || !date) {
    return null;
  }
  return PRICES.reduce((prices, price) => {
    if (hotels.find((hotel) => hotel.ridCode === price.ridCode)) {
      const offer = {
        ...price,
        offer: price.offers.find(
          (offer) => offer.fare === fare && offer.date === date
        ),
      };
      delete offer.offers;
      prices.push(offer);
    }
    return prices;
  }, []);
};

const sortByPriceAndDistance = (hotelsPrices) => {
  if (!hotelsPrices) {
    return null;
  }
  return hotelsPrices.sort((a, b) => {
    const hotel = PRICES.find((h) => h.ridCode === a.ridCode);
    const secondHotel = PRICES.find((h) => h.ridCode === b.ridCode);
    return (
      a.offer.price - b.offer.price || hotel.distance - secondHotel.distance
    );
  });
};

const getCheapestPrice = (hotelsPrices) => {
  if (!hotelsPrices) {
    return null;
  }
  const result = sortByPriceAndDistance(hotelsPrices);
  const { ridCode, offer } = result[0];
  return {
    ridCode,
    offer,
  };
};

module.exports = {
  getPrices: getPrices,
  sortByPriceAndDistance,
  getPriceByDate,
  getCheapestPrice,
};
