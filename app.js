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

        const offersByDate = findOffersByDate(date, ridCodes);

        return offersByDate;
   }
}

//Etape 2
function findHotelNearbyWithBestOffer(lat, lng, radius, date) {

    if (lat == null || lng == null || date == null) return null;

    const standard = "STANDARD";
    const hotels = findHotelsNearby(lat, lng, radius);
    const ridCodes = getRidCodes(hotels);

    const offersByDate = findOffersByDate(date, ridCodes);

    const offersByDateAndOfferType = findByOfferType(offersByDate, standard);

    return findBestOffer(offersByDateAndOfferType);
}

//Etape 3
function findHotelNearbyWithBestOfferForUser(lat, lng, radius, date, userId) {

    return null;
}


/*
function findOffersByDate(date) {
    const offers = priceService.getPrices();
    return offers.filter((offer) => isSameDate(date, offer.date));
}*/

function findOffersByDate(date, ridCodes) {
    let prices = priceService.getPrices();
    if (ridCodes) {
        prices = prices.filter( (price) => ridCodes.includes(price.ridCode));
    }
    return prices.filter((pricesByHotel) => pricesByHotel.offers.filter( (offer) => isSameDate(date, offer.date)) );
    //return prices.filter((pricesByHotel) => pricesByHotel.offers.filter( (offer) => offer.date == date) );
}

function getHotelsOffersByType(offers, offerType) {
    //const prices = priceService.getPrices();
    return prices.filter( (prices) => findByOfferType(prices.offers, offerType));
}

function findByOfferType(offers, offerType) {
    return offers.filter((offer) => offer.fare == offerType);
}

function isSameDate(targetDate, dateToTest) {
    let tgtDate = targetDate

}

/*function isSameDate(targetDate, dateToTest) {
    return moment(dateToTest.replaceAll('/','-'), 'DD-MM-YYYY').isSame(targetDate, 'day');
}

function isSameDate(targetDate, dateToTest) {
    let mTgtDate = moment(dateToTest, "DD/MM/YYYY", 'fr');
    let mDateToTest = moment(targetDate, "DD/MM/YYYY", 'fr');

    return !mDateToTest.isBefore(mTgtDate) && !mDateToTest.isAfter(mTgtDate);
}

function isSameDate(targetDate, dateToTest) {
    let mTgtDate = Date.parse(dateToTest);
    let mDateToTest = moment(targetDate, "DD/MM/YYYY");

    return !mDateToTest.isBefore(mTgtDate) && !mDateToTest.isAfter(mTgtDate);
}*/


function findBestOffer(offers) {

    let bestOffer = offers.reduce( (prev, curr) => {
        if (prev.price == curr.price) {
            findClosestHotel(prev.ridCode, curr.ridCode) ? prev : curr;
        }
        else {
            prev.price < curr.price ? prev : curr;
        }
    });

    let hotel = findHotelByRidCode(bestOffer.ridCode);

    return {
        "ridCode": hotels.ridCode,
        "countryCode": hotel.countryCode,
        "localRating": hotel.localRating,
        "address": hotel.address,
        "commercialName": hotel.commercialName,
        "distance": getDistance(hotel),
        "offer": {
            "date": bestOffer[0].date,
            "fare": bestOffer[0].fare,
            "price": bestOffer[0].price
        }
    };

}

function findClosestHotel(prevRidCode, currRidCode) {
    return compareDistance(prevRidCode, currRidCode);
}

function compareDistance(prevRidCode, currRidCode) {
    let lat = currentPosition.latitude;
    let longitude = currentPosition.longitude;
    let prevHotel = findHotelByRidCode(prevRidCode);
    let currHotel = findHotelByRidCode(currRidCode);

    let prevDistance = getDistance(prevHotel);
    let currDistance = getDistance(currHotel);

    return (prevDistance < currDistance) ? true : false;
}

function getDistance(hotel) {
    //let currentPosition = getCurrentPosition();
    return distance(hotel.longitude, hotel.latitude, currentPosition.lat, currentPosition.lng); //en km
}

function findHotelByRidCode(ridCode) {
    const hotels = hotelService.getHotels();
    return hotels.filter( (hotel) => hotel.ridCode === ridCode );
}

/*function distance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres

    return d;
}*/

function getRidCodes(hotels) {
    let ridCodes = [];
    for (let i =0; i < hotels.length; i++) {
        ridCodes[i] = hotels[i].ridCode;
    }
    return ridCodes;
}


module.exports = {
   findHotelsNearby: findHotelsNearby,
   findHotelNearbyWithBestOffer: findHotelNearbyWithBestOffer,
   findHotelNearbyWithBestOfferForUser: findHotelNearbyWithBestOfferForUser
}


