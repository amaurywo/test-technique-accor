const HOTELS = require('./data/hotels.json').hotels;

const getHotels = () => {
	return HOTELS;
}

const closestHotel = (hotelsWithBestPrice, hotelsNear) => {
	let hotelBestPrice = null;
	let distanceMin = null;

    for (let i = 0; i < hotelsWithBestPrice.length; ++i) {
      let ridCode = hotelsWithBestPrice[i].ridCode;
      let index = hotelsNear.map((ele) => { return ele.ridCode; }).indexOf(ridCode);
      let hotel = hotelsNear[index];

      if (hotel) {
        if (distanceMin === null) {
          distanceMin = hotel.distance;
          hotelBestPrice = hotel;
        } else {
          if (hotel.distance < distanceMin) {
            distanceMin = hotel.distance;
            hotelBestPrice = hotel;
          }
        }
        hotelBestPrice.offre = hotelsWithBestPrice[i].offre;
      } 
	}
	return hotelBestPrice;
}

module.exports = {
	getHotels: getHotels,
	closestHotel:closestHotel
}