const helper = require('./helper');

describe('Helper', () => {
  describe('distance()', () => {
    test('distance() returns the distance in meters betwween 2 geolocations', () => {
      expect(Math.round(helper.distance(48.864667, 2.326062, 48.849306, 2.349752))).toBe(2433);
    });
    test('distance is 0 when geolocations are the same', () => {
      expect(helper.distance(48.864667, 2.326062, 48.864667, 2.326062)).toBe(0);
    });
  });

  describe('sortBy()', () => {
    const expectedPrice = 78;
    const expectedRidCodeByDistance = 'A002';
    const expectedRidCodeByPrice = 'A003';

    const hotels = [
      {
        ridCode: 'A001',
        distance: 15,
        offer: {
          price: 76,
          date: '11/01/2021',
          fare: 'STANDARD',
        },
      },
      {
        ridCode: expectedRidCodeByDistance,
        distance: 5,
        offer: {
          price: expectedPrice,
          date: '11/01/2021',
          fare: 'STANDARD',
        },
      },
      {
        ridCode: expectedRidCodeByPrice,
        distance: 25,
        offer: {
          price: 70,
          date: '11/01/2021',
          fare: 'STANDARD',
        },
      },
    ];

    it('should get the proper inner prop value', () => {
      const path = 'offer.price';
      const hotel = hotels[1];

      const priceValue = helper.getByPath(hotel, path);

      expect(priceValue).toBe(expectedPrice);
    });

    it('should return default value', () => {
      const defaultValue = 'unknown';
      const path = 'offer.price.unexistent';
      const hotel = hotels[1];

      const priceValue = helper.getByPath(hotel, path, defaultValue);

      expect(priceValue).toBe(defaultValue);
    });

    it('should sort hotels by prop', () => {
      const prop = 'distance';

      const sortedByDistance = hotels.sort(helper.sortBy(prop));

      expect(sortedByDistance[0].ridCode).toBe(expectedRidCodeByDistance);
    });
    it('should sort hotels by path', () => {
      const path = 'offer.price';

      const sortedByPrice = hotels.sort(helper.sortBy(path));

      expect(sortedByPrice[0].ridCode).toBe(expectedRidCodeByPrice);
    });
  });
});
