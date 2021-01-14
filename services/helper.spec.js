const helper = require('./helper');

describe('Helper', () => {
  test('distance() returns the distance in meters betwween 2 geolocations', () => {
    expect(Math.round(helper.distance(48.864667, 2.326062, 48.849306, 2.349752))).toBe(2433);
  });
  test('distance is 0 when geolocations are the same', () => {
    expect(helper.distance(48.864667, 2.326062, 48.864667, 2.326062)).toBe(0);
  });
});