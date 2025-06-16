import { sequelize, testConnection } from './models/db.js';

export async function initDatabase() {
  try {
    const connected = await testConnection();

    if (connected) {
      await sequelize.sync();
      console.log('Database models synchronized.');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Database initialization failed:', error);
    return false;
  }
}
