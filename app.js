const userService = require("./services/user-service");
const hotelService = require("./services/hotel-service");
const priceService = require("./services/price-service");
const helper = require("./services/helper");

function findHotelsNearby(lat, lng, radius) {
  const hotelsNearby = [];

  hotelService.getHotels().forEach((hotel) => {
    let distance = helper.distance(hotel.latitude, hotel.longitude, lat, lng);
    if (distance <= radius) {
        let newHotel = {
          ridCode: hotel.ridCode,
          countryCode: hotel.countryCode,
          localRating: hotel.localRating,
          address: hotel.address,
          commercialName: hotel.commercialName,
          distance: parseInt(distance),
        };
  
        hotelsNearby.push(newHotel);
      }
  })

  return hotelsNearby;
}

function findHotelNearbyWithBestOffer(lat, lng, radius, date) {
  const hotelsWithBestPrice = priceService.getHotelsWithBestPriceByFare(date,"STANDARD");
  let hotelBestPrice = null;

  if (hotelsWithBestPrice.length > 0) {
    const hotelsNear = findHotelsNearby(lat, lng, radius);
    hotelBestPrice =  hotelService.closestHotel(hotelsWithBestPrice, hotelsNear);
  }
  return hotelBestPrice ;
}

function findHotelNearbyWithBestOfferForUser( lat, lng, radius, date, userId) {
  let hotelBestPrice = null;

  if (userService.userIsSubscribed(userId)) {
    const hotelsWithBestPrice = priceService.getHotelsWithBestPriceByFare( date );
    if (hotelsWithBestPrice.length > 0) {
      const hotelsNear = findHotelsNearby(lat, lng, radius);
      hotelBestPrice = hotelService.closestHotel(hotelsWithBestPrice, hotelsNear);
    }
  } else {
    hotelBestPrice = findHotelNearbyWithBestOffer(lat, lng, radius, date);
  }

  return hotelBestPrice;
}

module.exports = {
  findHotelsNearby: findHotelsNearby,
  findHotelNearbyWithBestOffer: findHotelNearbyWithBestOffer,
  findHotelNearbyWithBestOfferForUser: findHotelNearbyWithBestOfferForUser,
};
