const { getCarbonData } = require('../controllers/carbonIntensity.controller');
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