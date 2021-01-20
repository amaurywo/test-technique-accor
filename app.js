const userService = require("./services/user-service");
const hotelService = require("./services/hotel-service");
const priceService = require("./services/price-service");
const helper = require("./services/helper");

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

async function findHotelNearbyWithBestOffer(lat, lng, radius, date) {
  const hotelsWithBestPrice = await priceService.getHotelsWithBestPriceByFare(date,"STANDARD");
  let hotelBestPrice = null;

  if (hotelsWithBestPrice.length > 0) {
    const hotelsNear = await findHotelsNearby(lat, lng, radius);
    hotelBestPrice =  await hotelService.closestHotel(hotelsWithBestPrice, hotelsNear);
  }
  return hotelBestPrice ;
}

async function findHotelNearbyWithBestOfferForUser( lat, lng, radius, date, userId) {
  let hotelBestPrice = null;

  if (userService.userIsSubscribed(userId)) {
    const hotelsWithBestPrice = await priceService.getHotelsWithBestPriceByFare( date, "ALL" );
    if (hotelsWithBestPrice.length > 0) {
      const hotelsNear = await findHotelsNearby(lat, lng, radius);
      hotelBestPrice = await hotelService.closestHotel(hotelsWithBestPrice, hotelsNear);
    }
  } else {
    hotelBestPrice = await findHotelNearbyWithBestOffer(lat, lng, radius, date);
  }

  return hotelBestPrice;
}

// console.log("hotels", findHotelsNearby(48.856564, 2.351711, 2));
// console.log("prices",findHotelNearbyWithBestOffer(48.855163, 2.409015, 2, "11/01/2021"));
// console.log("user",findHotelNearbyWithBestOfferForUser(48.855163, 2.409015, 5, "13/01/2021",8));

module.exports = {
  findHotelsNearby: findHotelsNearby,
  findHotelNearbyWithBestOffer: findHotelNearbyWithBestOffer,
  findHotelNearbyWithBestOfferForUser: findHotelNearbyWithBestOfferForUser,
};
