#!/bin/sh

# Wait for the database to be ready
echo "Waiting for database to be ready..."
sleep 10

# Check if database is already seeded
echo "Checking database status..."
node -e "
import { sequelize, CarbonData } from './models/db.js';

async function checkDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    const count = await CarbonData.count();
    if (count === 0) {
      console.log('Database is empty, seeding required');
      process.exit(0);
    } else {
      console.log('Database already contains data, skipping seed');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error checking database:', error);
    process.exit(0);
  }
}

checkDatabase();
" && (
  # Only run seeder if the check returns 0 (database is empty)
  echo "Seeding the database..."
  node seeders/mockData.js || echo "Seeding failed but continuing with in-memory data..."
) || echo "Database already contains data, skipping seed"

# Keep the container running with the main process
echo "Starting main application..."
npm run dev