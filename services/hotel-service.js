const HOTELS = require("./data/hotels.json").hotels;

const getHotels = () => {
  return HOTELS;
};

const closestHotel = (hotelsWithBestPrice, hotelsNear) => {
  let hotelBestPrice = null;
  let distanceMin = null;

  hotelsWithBestPrice.forEach((item) => {
    let ridCode = item.ridCode;
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
      hotelBestPrice.offre = item.offre;
    }
  });

  return hotelBestPrice;
};

module.exports = {
  getHotels: getHotels,
  closestHotel: closestHotel,
};
