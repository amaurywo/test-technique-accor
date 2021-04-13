const HOTELS = require('./data/hotels.json').hotels;

const getHotels = () => {
	return HOTELS;
}

module.exports = {
	getHotels: getHotels
}