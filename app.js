const userService = require('./services/user-service');
const hotelService = require('./services/hotel-service');
const priceService = require('./services/price-service');
const helper = require('./services/helper');

function findHotelsNearby ( lat, lng, radius ) {

	// Returns an empty array when no args are passed

	// Every parameters are mandatory (should throw an exception, and should not exist in typescript)
	if ( typeof lat == "undefined" ) return [];
	if ( typeof lng == "undefined" ) return [];
	if ( typeof radius == "undefined" ) return [];
	// Ideally, type verification should be stronger, or parameters should be heavily typed in typescript


	let everyHotels = hotelService.getHotels();

	// Preferred implementation: map (properties + distance) + filter (distance < radius)
	let hotelsNearby = everyHotels
		.map ( hotel => {
			return {
				ridCode:        hotel.ridCode,
				countryCode:    hotel.countryCode,
				localRating:    hotel.localRating,
				address:        hotel.address,
				commercialName: hotel.commercialName,

				// parseInt / Math.round could be used (here, we are talking about fractions of a meter)
				distance: Math.round ( helper.distance (
					lat, lng,
					hotel.latitude, hotel.longitude
				) )
			};
		})
		. filter ( hotel => {
			// Assuming distance and radius are in meters
			return hotel.distance < radius;
		});

	// Could also be sorted by distance, closest first...

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

module.exports = {
	findHotelsNearby: findHotelsNearby,
	findHotelNearbyWithBestOffer: findHotelNearbyWithBestOffer,
	findHotelNearbyWithBestOfferForUser: findHotelNearbyWithBestOfferForUser
}
