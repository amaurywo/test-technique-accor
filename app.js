const userService = require('./services/user-service');
const hotelService = require('./services/hotel-service');
const priceService = require('./services/price-service');
const helper = require('./services/helper');

function findHotelsNearby(lat, lng, radius = 2000) {
  if (arguments.length === 0) {
    return [];
  }
  const hotelsNearby = hotelService.getHotels()
    .filter((hotel) => helper.distance(lat, lng, hotel.latitude, hotel.longitude) <= radius)
    .map((hotel) => ({
      ...hotel,
      distance: Math.round(helper.distance(lat, lng, hotel.latitude, hotel.longitude)),
    })); // Maybe use reduce instead of filter+map if performance is an issue?

  return hotelsNearby;
}

function sortByBestOfferAndCloseness(hotel1, hotel2) {
  if (hotel1.offer.price < hotel2.offer.price) { return -1; }
  if (hotel1.offer.price > hotel2.offer.price) { return 1; }
  return hotel1.distance <= hotel2.distance ? -1 : 0;
}

function findHotelNearbyWithBestOffer(lat, lng, radius, date, isSubscribed = false) {
  if (arguments.length === 0) {
    return null;
  }

  const hotelsNearby = findHotelsNearby(lat, lng, radius);
  const hotelsNearbyWithPriceForDate = hotelsNearby.map((hotel) => {
    const offer = priceService.getHotelBestPriceForDate(hotel.ridCode, date, isSubscribed);
    return {
      ...hotel,
      offer,
    };
  });

  const hotelNearbyBestOffer = hotelsNearbyWithPriceForDate
    .sort(sortByBestOfferAndCloseness)
    .shift();

  return hotelNearbyBestOffer;
}

function findHotelNearbyWithBestOfferForUser(lat, lng, radius, date, userId) {
  if (arguments.length === 0) {
    return null;
  }

  const isSubscribed = !!userService.getUserById(userId).subscribed;

  return findHotelNearbyWithBestOffer(lat, lng, radius, date, isSubscribed);
}

module.exports = {
  findHotelsNearby,
  findHotelNearbyWithBestOffer,
  findHotelNearbyWithBestOfferForUser,
};
