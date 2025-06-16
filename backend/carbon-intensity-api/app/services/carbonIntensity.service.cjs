// CommonJS version of the service for testing
const mockData = require('../models/mockData');

// Create a mutable copy of the data for our service
let carbonData = [...mockData];

function getAllCarbonData() {
  return carbonData;
}

function insertCarbonData(newEntry) {
  carbonData.push(newEntry);
  return newEntry;
}

function updateCarbonData(entry) {
  const index = carbonData.findIndex(
    (item) => item.from === entry.originalFrom && item.to === entry.originalTo,
  );

  if (index === -1) return null;

  const { originalFrom, originalTo, ...updatedEntry } = entry;
  carbonData[index] = updatedEntry;
  return carbonData[index];
}

function removeCarbonData(entry) {
  const index = carbonData.findIndex((item) => item.from === entry.from && item.to === entry.to);

  if (index === -1) return null;

  const [deleted] = carbonData.splice(index, 1);
  return deleted;
}

module.exports = {
  getAllCarbonData,
  insertCarbonData,
  updateCarbonData,
  removeCarbonData,
};
