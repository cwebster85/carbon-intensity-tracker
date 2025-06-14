const db = require('../models/mockData');

exports.getCarbonIntensity = (req, res) => {
  res.json(db);
};