const distance = (lat1, lon1, lat2, lon2) => {
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
}

/**
 *
 * @param hotels: { ridCode: string, ... }
 * @param prices: { prices: [ { ridCode: string, offers: [] } ] }
 * @returns hash [ key: ridCode ] = {} // hotel extended elements
 */

const hotelDictionary = ( hotels, prices ) => {

	// Using ridCode as identifier
	let dictionary = {};

	// Build dictionary / hash from hotels dataset, using ridCode as key
	hotels.forEach ( hotel => {
		const key = hotel.ridCode;

		/*
		if ( typeof dictionary [ key ] != "undefined" )
		{
			// Warn if key conflict ?
			console.warn ( "ridCode conflict: ", key );
		}
		*/

		// If conflict => override (last declared has priority)
		dictionary [ key ] = hotel;

		// Extend with offers property, initialized to [] (no offer)
		dictionary [ key ].offers = [];
	});

	// Extend with prices dataset
	prices.forEach ( price => {

		let key = price.ridCode;

		// Only extends if ridCode exists in the dictionary
		if ( typeof dictionary [ key ] != "undefined" )
		{
			// With concat, we avoid the override usecase, when prices array contains a same ridCode multiple times
			dictionary [ key ].offers = dictionary [ key ].offers.concat ( price.offers );
		}
	});

	return dictionary;
}

module.exports = {
	distance: distance,
	hotelDictionary: hotelDictionary
}
