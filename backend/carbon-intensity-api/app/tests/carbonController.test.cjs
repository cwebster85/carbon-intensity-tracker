const { getCarbonData, addCarbonData } = require('../controllers/carbonIntensity.controller.cjs');
const mockData = require('../models/mockData');

describe('getCarbonData', () => {
  it('should respond with status 200 and mock data', () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    getCarbonData(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });
});

describe('addCarbonData', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should return 400 if required fields are missing', () => {
    req.body = { to: '2025-01-01T00:30Z' };

    addCarbonData(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing required fields' });
  });

  it('should return 201 and add data if valid', () => {
    req.body = {
      from: '2025-01-01T00:00Z',
      to: '2025-01-01T00:30Z',
      intensity_forecast: 250,
      intensity_actual: 245,
      index: 'moderate',
      gas: 30.0,
      coal: 10.0,
      biomass: 5.0,
      nuclear: 15.0,
      hydro: 2.0,
      imports: 8.0,
      wind: 10.0,
      solar: 12.0,
      other: 3.0,
    };

    addCarbonData(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });
});
