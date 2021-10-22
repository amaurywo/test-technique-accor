const PRICES = require("./data/prices.json").prices;

const getPrices = () => {
  return PRICES;
};

const getCheapestHotelByDate = (hotels, date, fare = "STANDARD") => {
  if (!hotels || !hotels.length || !date) {
    return null;
  }
  const hotelsPrices = PRICES.reduce((prices, price) => {
    if (hotels.find((hotel) => hotel.ridCode === price.ridCode)) {
      price.offer = price.offers.find(
        (offer) => offer.fare === fare && offer.date === date
      );
      prices.push(price);
    }
    return prices;
  }, []);
  const result = hotelsPrices.sort((a, b) => {
    const hotel = hotels.find((h) => h.ridCode === a.ridCode);
    const secondHotel = hotels.find((h) => h.ridCode === b.ridCode);
    return (
      a.offer.price - b.offer.price || hotel.distance - secondHotel.distance
    );
  });
  const { ridCode, offer } = result[0];
  return {
    ridCode,
    offer,
  };
};

module.exports = {
  getPrices: getPrices,
  getCheapestHotelByDate,
};
