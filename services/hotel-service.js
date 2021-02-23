const HOTELS = require('./data/hotels.json').hotels;

const getHotels = () => HOTELS;

module.exports = {
  getHotels,
};
