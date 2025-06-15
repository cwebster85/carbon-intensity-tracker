const { getAllCarbonData, insertCarbonData, removeCarbonData, updateCarbonData } = require('../services/carbonIntensity.service');

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

function addCarbonData(req, res) {
  try {
    const requiredFields = [
      'from', 'to', 'intensity_forecast', 'intensity_actual', 'index',
      'gas', 'coal', 'biomass', 'nuclear', 'hydro', 'imports', 'wind', 'solar', 'other'
    ];
    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === '') {
        return res.status(400).json({ error: 'Missing required fields' });
      }
    }

    const newEntry = insertCarbonData(req.body);
    res.status(201).json(newEntry);
  } catch (error) {
    console.error('Error adding carbon data:', error);
    res.status(500).json({ error: 'Failed to add data' });
  }
}

function editCarbonData(req, res) {
  try {
    const updated = updateCarbonData(req.body);

    if (updated) {
      res.status(200).json(updated);
    } else {
      res.status(404).json({ error: 'Entry not found' });
    }
  } catch (error) {
    console.error('Error editing carbon data:', error);
    res.status(500).json({ error: 'Failed to edit data' });
  }
}

function deleteCarbonData(req, res) {
  try {
    const deleted = removeCarbonData(req.body);

    if (deleted) {
      res.status(200).json({ success: true, deleted });
    } else {
      res.status(404).json({ success: false, error: 'No matching record found' });
    }
  } catch (error) {
    console.error('Error deleting carbon data:', error);
    res.status(500).json({ error: 'Failed to delete data' });
  }
}

module.exports = {
  getCarbonData,
  addCarbonData,
  editCarbonData,
  deleteCarbonData
};