const express = require('express');
const router = express.Router();
const carbonController = require('../controllers/carbonIntensity.controller');

// GET /api/intensity
router.get('/get/intensity', carbonController.getCarbonData);
// POST /api/intensity
router.post('/add/intensity', carbonController.addCarbonData);
// POST /api/intensity
router.put('/edit/intensity', carbonController.editCarbonData);
// DELETE /api/intensity
router.post('/delete/intensity', carbonController.deleteCarbonData);

module.exports = router;