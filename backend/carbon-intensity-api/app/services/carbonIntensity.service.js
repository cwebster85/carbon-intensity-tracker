import mockData from '../mockData.js';
import { CarbonData } from '../models/db.js';

async function getAllCarbonData() {
  try {
    console.log('Fetching data from database...');
    const dbData = await CarbonData.findAll();
    console.log(`Retrieved ${dbData.length} records from database`);

    if (dbData && dbData.length > 0) {
      return dbData;
    }

    console.log('No database records found, using mock data');
    return mockData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return mockData;
  }
}

async function insertCarbonData(newEntry) {
  try {
    console.log('Inserting new entry into database:', newEntry);
    const dbEntry = await CarbonData.create(newEntry);
    console.log('Entry inserted successfully:', dbEntry.id);
    return dbEntry;
  } catch (error) {
    console.error('Error inserting data:', error);
    return newEntry;
  }
}

async function updateCarbonData(entry) {
  try {
    const { originalFrom, originalTo, ...updatedEntry } = entry;
    console.log(`Updating entry from=${originalFrom}, to=${originalTo}`);

    const [updated] = await CarbonData.update(updatedEntry, {
      where: {
        from: originalFrom,
        to: originalTo,
      },
    });

    console.log(`Updated ${updated} records`);

    if (updated > 0) {
      const result = await CarbonData.findOne({
        where: {
          from: updatedEntry.from,
          to: updatedEntry.to,
        },
      });
      return result;
    }

    return null;
  } catch (error) {
    console.error('Error updating data:', error);
    return null;
  }
}

async function removeCarbonData(entry) {
  try {
    console.log(`Deleting entry from=${entry.from}, to=${entry.to}`);
    const recordToDelete = await CarbonData.findOne({
      where: {
        from: entry.from,
        to: entry.to,
      },
    });

    if (recordToDelete) {
      await recordToDelete.destroy();
      console.log('Entry deleted successfully');
      return recordToDelete;
    }

    console.log('No matching record found for deletion');
    return null;
  } catch (error) {
    console.error('Error removing data:', error);
    return null;
  }
}

export { getAllCarbonData, insertCarbonData, updateCarbonData, removeCarbonData };
