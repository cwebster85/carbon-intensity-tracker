const express = require('express');
const router = express.Router();
const carbonController = require('../controllers/carbonIntensity.controller');

// GET /api/intensity
router.get('/intensity', carbonController.getCarbonIntensity);

module.exports = router;