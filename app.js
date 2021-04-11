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

	// Every parameters are mandatory (should throw an exception, and should not exist in typescript)
	if ( typeof lat == "undefined" ) return null;
	if ( typeof lng == "undefined" ) return null;
	if ( typeof radius == "undefined" ) return null;
	if ( typeof date == "undefined" ) return null;

	let hotelsNearBy = findHotelsNearby ( lat, lng, radius );
	let hotelDictionary = helper.hotelDictionary ( hotelsNearBy, priceService.getPrices() || [] );

	let bestOfferPerHotelArray = [];

	for ( let key in hotelDictionary )
	{
		let hotel = hotelDictionary [ key ];

		// If no offer, then skip
		if ( hotel.offers.length === 0 ) continue;

		// Filter hotel offers on fare (STANDARD) and date, and sort (price only, ascending)
		let hotelOffers = hotel.offers
			.filter ( offer => {
				return ( offer.fare === "STANDARD" ) && ( offer.date === date );
			})
			.sort ( ( o1, o2 ) => {
				return o1.price - o2.price;
			} );

		let bestOfferOnPrice = hotelOffers [ 0 ];

		// Add best offer for this hotel
		bestOfferPerHotelArray.push ( {
			ridCode: key,
			offer: bestOfferOnPrice,
			distance: hotel.distance
		} );
	}

	if ( bestOfferPerHotelArray.length === 0 ) return null;

	// Then sort bestOfferPerHotelArray (price ascending first, distance ascending second)
	bestOfferPerHotelArray = bestOfferPerHotelArray.sort ( ( h1, h2 ) => {
		let deltaPrice = h1.offer.price - h2.offer.price;

		if ( deltaPrice !== 0 ) return deltaPrice;

		return h1.distance - h2.distance;
	} );

	// The result is the first element of bestOfferPerHotelArray
	const chosen = bestOfferPerHotelArray [ 0 ];
	const ridCode = chosen [ "ridCode" ];
	const hotel = hotelDictionary [ ridCode ];

	// Only expected properties are exposed

	const result = {
		ridCode,
		countryCode: hotel.countryCode,
		localRating: hotel.localRating,
		address: hotel.address,
		commercialName: hotel.commercialName,
		distance: hotel.distance,
		offer: chosen.offer
	};

	return result;
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
