import { sequelize, CarbonData } from '../models/db.js';

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

async function seedDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Create tables if they don't exist, but don't drop existing tables
    await sequelize.sync({ force: false });
    console.log('Database tables created.');

    // Check if data already exists
    const count = await CarbonData.count();
    if (count === 0) {
      // Only seed if no data exists
      await CarbonData.bulkCreate(mockData);
      console.log('Database seeded successfully.');
    } else {
      console.log('Database already contains data, skipping seed.');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
    console.log('Mock seeding: In a real app, we would seed the database with the mock data.');
  }
}

seedDatabase();
