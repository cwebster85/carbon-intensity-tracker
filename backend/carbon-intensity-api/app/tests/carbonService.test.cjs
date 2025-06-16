const { getAllCarbonData } = require('../services/carbonIntensity.service.cjs');
const mockData = require('../models/mockData');

describe('getAllCarbonData', () => {
  it('should return mock data', () => {
    const data = getAllCarbonData();
    expect(data).toEqual(mockData);
    expect(data.length).toBeGreaterThan(0);
  });
});
