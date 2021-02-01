const helper = require('./services/helper');
const userService = require('./services/user-service');
const hotelService = require('./services/hotel-service');
const priceService = require('./services/price-service');
const moment = require('./node_modules/moment/min/moment-with-locales.min.js');


//Etape 1
function findHotelsNearby(lat, lng, radius) {

    const hotels = hotelService.getHotels();

    if (hotels.length <= 0 || lat == null || lng == null || radius == null ) {
       return [];
   }
   else {
        let nearbyHotels = hotels.filter( (hotel) => helper.distance(hotel.latitude, hotel.longitude, lat, lng) <= radius );
        return nearbyHotels;
   }
}

function findHotelsNearbyByDate(lat, lng, radius, date) {

    if (date == null ) {
       return [];
   }
   else {
        const nearbyHotels = findHotelsNearby(lat, lng, radius);
        const ridCodes = getRidCodes(nearbyHotels);

        return findOffersByDate(date, ridCodes);
   }
}

//Etape 2
function findHotelNearbyWithBestOffer(lat, lng, radius, date, userType) {

    if (lat == null || lng == null || date == null) return null;

    const offerType = userType != null ? userType : "STANDARD";

    const offersByDate = findHotelsNearbyByDate(lat, lng, radius, date);

    const offersByDateAndOfferType = findByOfferType(offersByDate, offerType);

    return findBestOffer(offersByDateAndOfferType, lat, lng);
}

//Etape 3
function findHotelNearbyWithBestOfferForUser(lat, lng, radius, date, userId) {

    if (lat == null || lng == null || radius == null ||date == null || userId == null) {
        return null;
    }

    const user = getUserById(userId);

    const userType = getUserType(user);

    return findHotelNearbyWithBestOffer(lat, lng, radius, date, userType);
}


function findOffersByDate(date, ridCodes) {

    let prices = priceService.getPrices();
    if (ridCodes) {
        prices = prices.filter( (price) => ridCodes.includes(price.ridCode));
    }

    for (let i=0; i < prices.length; i++) {
        prices[i].offers = prices[i].offers.filter( (offer) => offer.date == date );
    }
    const offers = prices.filter( (price) => price.offers.length > 0);
    return offers;
}

function findByOfferType(prices, offerType) {

    const copy = JSON.parse(JSON.stringify(prices));

    for (let i=0; i < copy.length; i++) {
        let off = copy[i].offers;
        copy[i].offers = off.filter((offer) => offer.fare == offerType);
    }
    return copy;
}

function findBestOffer(offers, lat, lng) {

    if (offers == null || offers.length == 0) {
        return { "ridCode": null };
    }

    let bestOffer = null; //init

    offers.filter( function(offer) {
        if (bestOffer == null) {
            bestOffer = offer;
        }
        else if (bestOffer.offers[0].price == offer.offers[0].price) {
            bestOffer = findClosestHotel(bestOffer.ridCode, offer.ridCode, lat, lng) ? bestOffer : offer;
        }
        else {
            bestOffer = bestOffer.offers[0].price < offer.offers[0].price ? bestOffer : offer;
        }
    });

    let hotel = findHotelByRidCode(bestOffer.ridCode);

    return {
        "ridCode": hotel.ridCode,
        "countryCode": hotel.countryCode,
        "localRating": hotel.localRating,
        "address": hotel.address,
        "commercialName": hotel.commercialName,
        "distance": getDistance(hotel, lat, lng),
        "offer": {
            "date": bestOffer.offers[0].date,
            "fare": bestOffer.offers[0].fare,
            "price": bestOffer.offers[0].price
        }
    };

}

function findClosestHotel(prevRidCode, currRidCode, lat, lng) {

    let prevHotel = findHotelByRidCode(prevRidCode);
    let currHotel = findHotelByRidCode(currRidCode);

    let prevDistance = getDistance(prevHotel, lat, lng);
    let currDistance = getDistance(currHotel, lat, lng);

    return (prevDistance < currDistance) ? true : false;
}

function getDistance(hotel, lat, lng) {

    return helper.distance(hotel.latitude, hotel.longitude, lat, lng);
}

function findHotelByRidCode(ridCode) {

    const hotels = hotelService.getHotels();
    return hotels.filter( (hotel) => hotel.ridCode == ridCode )[0];
}

function getRidCodes(hotels) {
    let ridCodes = [];
    for (let i =0; i < hotels.length; i++) {
        ridCodes[i] = hotels[i].ridCode;
    }
    return ridCodes;
}

function getUserById(id) {
    const users = userService.getUsers();
    return users.filter( (user) => user.id == id)[0];
}

function getUserType(user) {
    const specialOffer = "SPECIAL_OFFER";
    const usualOffer = "STANDARD";

    return user.subscribed ? specialOffer : usualOffer;
}


module.exports = {
   findHotelsNearby: findHotelsNearby,
   findHotelsNearbyByDate: findHotelsNearbyByDate,
   findHotelNearbyWithBestOffer: findHotelNearbyWithBestOffer,
   findHotelNearbyWithBestOfferForUser: findHotelNearbyWithBestOfferForUser
}


