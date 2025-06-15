const mockData = require('../models/mockData');

function getAllCarbonData() {
    return mockData;
}

function insertCarbonData(newEntry) {
    mockData.push(newEntry);
    return newEntry;
}

function updateCarbonData(entry) {
    const index = mockData.findIndex(
        (item) => item.from === entry.originalFrom && item.to === entry.originalTo
    );

    if (index === -1) return null;

    const { originalFrom, originalTo, ...updatedEntry } = entry;
    mockData[index] = updatedEntry;
    return mockData[index];
}

function removeCarbonData(entry) {
    const index = mockData.findIndex(
        (item) => item.from === entry.from && item.to === entry.to
    );

    if (index === -1) return null;

    const [deleted] = mockData.splice(index, 1);
    return deleted;
}

module.exports = {
    getAllCarbonData,
    insertCarbonData,
    updateCarbonData,
    removeCarbonData
};