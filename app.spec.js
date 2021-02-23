const app = require('./app');

describe('App', () => {
  test('findHotelsNearby() returns an empty array when no args are passed', () => {
    expect(app.findHotelsNearby().length).toBe(0);
  });
  test('findHotelsNearby() returns a filtered set of hotels according to arguments', () => {
    const hotelsNearby = app.findHotelsNearby(48.856564, 2.351711);
    expect(hotelsNearby.length).toBe(19);
    expect(hotelsNearby.some((hotel) => hotel.address === '20 Rue du Sommerard, 75005 PARIS')).toBe(true);
    expect(hotelsNearby.some((hotel) => hotel.address === '22  rue Danielle Casanova, 75002 PARIS')).toBe(true);
    expect(hotelsNearby.find((hotel) => hotel.address === '22  rue Danielle Casanova, 75002 PARIS').distance).toBe(1966);
    expect(hotelsNearby.find((hotel) => hotel.address === '20 Rue du Sommerard, 75005 PARIS').distance).toBe(849);
  });
  test('when user is at the center of Paris, some hotels are found', () => {
    expect(app.findHotelsNearby(48.856564, 2.351711, 2000).length).toBeGreaterThan(0);
  });
  test('findHotelNearbyWithBestOffer() returns null when no args are passed', () => {
    expect(app.findHotelNearbyWithBestOffer()).toBeNull();
  });
  test('when user is at the center of Paris, and looks for the cheapest offer in hotels around for the date 11/01/2021, an hotel is found', () => {
    const hotelWithBestOffer = app.findHotelNearbyWithBestOffer(48.856564, 2.351711, 2000, '11/01/2021');
    expect(hotelWithBestOffer.ridCode).toBeDefined();
    expect(hotelWithBestOffer.offer).toBeDefined();
    expect(typeof hotelWithBestOffer === 'object').toBe(true);
    expect(Array.isArray(hotelWithBestOffer.offer)).toBe(false);
    expect(hotelWithBestOffer.ridCode).toBe('A013');
    expect(hotelWithBestOffer.offer.price).toBe(74);
  });
  test('findHotelNearbyWithBestOfferForUser() returns null when no args are passed', () => {
    expect(app.findHotelNearbyWithBestOfferForUser()).toBeNull();
  });
  test('when a subscribed user is at the center of Paris, and looks for the cheapest offer in hotels around for the date 11/01/2021, an hotel is found', () => {
    expect(app.findHotelNearbyWithBestOfferForUser(48.856564, 2.351711, 2000, '11/01/2021', 2).ridCode).toBeDefined();
  });
});
