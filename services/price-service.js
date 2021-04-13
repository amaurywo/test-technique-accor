const PRICES = require('./data/prices.json').prices;

const getPrices = () => {
	return PRICES;
}

module.exports = {
	getPrices: getPrices
}