const HOTELS = require("./data/hotels.json").hotels;

const getHotels = () => {
  return HOTELS;
};

const closestHotel = (hotelsWithBestPrice, hotelsNear) => {
  let hotelBestPrice = null;
  let distanceMin = null;

  hotelsWithBestPrice.forEach((item) => {
    let hotel =  hotelsNear.filter((ele) => {
      if (item.ridCode === ele.ridCode) return ele;
    });

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
      hotelBestPrice.offer = item.offer;
    }
  });

  return hotelBestPrice;
};

module.exports = {
  getHotels: getHotels,
  closestHotel: closestHotel,
};
