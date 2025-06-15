const { getAllCarbonData } = require('../services/carbonIntensityService');

function getCarbonData(req, res) {
  try {
    const data = getAllCarbonData();

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No data found' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching carbon data:', error);
    res.status(500).json({ error: 'Failed to fetch data due to server error' });
  }
}

module.exports = {
  getCarbonData,
};