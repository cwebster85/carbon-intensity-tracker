const express = require('express');
const router = express.Router();
const carbonController = require('../controllers/carbonIntensity.controller');

// GET /api/carbon-intensity
router.get('/carbon-intensity', carbonController.getCarbonIntensity);

module.exports = router;