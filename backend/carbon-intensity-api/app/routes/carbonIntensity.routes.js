import express from 'express';
const router = express.Router();

const mockData = [
  {
    from: '2018-01-20T17:00Z',
    to: '2018-01-20T17:30Z',
    intensity_forecast: 270,
    intensity_actual: 268,
    index: 'moderate',
    gas: 35.6,
    coal: 12.7,
    biomass: 5.2,
    nuclear: 14.6,
    hydro: 3.1,
    imports: 11.5,
    wind: 12.8,
    solar: 19.1,
    other: 2.3,
  },
  {
    from: '2018-01-20T17:30Z',
    to: '2018-01-20T18:00Z',
    intensity_forecast: 260,
    intensity_actual: 258,
    index: 'low',
    gas: 45.6,
    coal: 6.7,
    biomass: 3.2,
    nuclear: 11.6,
    hydro: 4.1,
    imports: 9.5,
    wind: 10.8,
    solar: 17.1,
    other: 1.3,
  },
];

// Controller functions
function getCarbonData(req, res) {
  try {
    res.status(200).json(mockData);
  } catch (error) {
    console.error('Error fetching carbon data:', error);
    res.status(500).json({ error: 'Failed to fetch data due to server error' });
  }
}

function addCarbonData(req, res) {
  try {
    const newEntry = req.body;
    mockData.push(newEntry);
    res.status(201).json(newEntry);
  } catch (error) {
    console.error('Error adding carbon data:', error);
    res.status(500).json({ error: 'Failed to add data' });
  }
}

function editCarbonData(req, res) {
  try {
    const { originalFrom, originalTo, ...updatedEntry } = req.body;
    const index = mockData.findIndex(
      (item) => item.from === originalFrom && item.to === originalTo,
    );

    if (index === -1) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    mockData[index] = updatedEntry;
    res.status(200).json(updatedEntry);
  } catch (error) {
    console.error('Error editing carbon data:', error);
    res.status(500).json({ error: 'Failed to edit data' });
  }
}

function deleteCarbonData(req, res) {
  try {
    const { from, to } = req.body;
    const index = mockData.findIndex((item) => item.from === from && item.to === to);

    if (index === -1) {
      return res.status(404).json({ success: false, error: 'No matching record found' });
    }

    const deleted = mockData.splice(index, 1)[0];
    res.status(200).json({ success: true, deleted });
  } catch (error) {
    console.error('Error deleting carbon data:', error);
    res.status(500).json({ error: 'Failed to delete data' });
  }
}

// Routes
router.get('/get/intensity', getCarbonData);
router.post('/add/intensity', addCarbonData);
router.put('/edit/intensity', editCarbonData);
router.post('/delete/intensity', deleteCarbonData);

export default router;
