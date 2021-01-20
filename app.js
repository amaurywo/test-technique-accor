const userService = require('./services/user-service');
const hotelService = require('./services/hotel-service');
const priceService = require('./services/price-service');
const helper = require('./services/helper');

async function findHotelsNearby(lat, lng, radius) {
    const COEF_CONV_KM_TO_M = 1000;
    const RADIUS = radius * COEF_CONV_KM_TO_M;
    const hotelsNearby = [];
    const hotels = await hotelService.getHotels();
  
    for (let i = 0; i < hotels.length; ++i) {
      let distance = helper.distance(hotels[i].latitude, hotels[i].longitude, lat, lng);
  
      if (distance <= RADIUS) {
        let hotel = {
          ridCode: hotels[i].ridCode,
          countryCode: hotels[i].countryCode,
          localRating: hotels[i].localRating,
          address: hotels[i].address,
          commercialName: hotels[i].commercialName,
          distance: parseInt(distance),
        };
  
        hotelsNearby.push(hotel);
      }
    }
    return hotelsNearby;
  }

function findHotelNearbyWithBestOffer(lat, lng, radius, date) {
    // TODO implement me
    return null;
}

function findHotelNearbyWithBestOfferForUser(lat, lng, radius, date, userId) {
    // TODO implement me
    return null;
}

// console.log("hotels", findHotelsNearby(48.856564, 2.351711, 2));

module.exports = {
	findHotelsNearby: findHotelsNearby,
	findHotelNearbyWithBestOffer: findHotelNearbyWithBestOffer,
	findHotelNearbyWithBestOfferForUser: findHotelNearbyWithBestOfferForUser
}