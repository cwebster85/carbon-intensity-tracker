import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import carbonIntensityRouter from './routes/carbonIntensity.routes.js';
import { sequelize, CarbonData } from './models/db.js';
import mockData from './mockData.js';

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://frontend:5173'],
  }),
);

// Database initialization
async function initializeDatabase() {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('Database connection established successfully');

    // Create tables without dropping existing ones
    await sequelize.sync({ force: false });
    console.log('Database tables synchronized');

    // Seed only if empty
    const count = await CarbonData.count();
    if (count === 0) {
      console.log('Seeding database with initial data');
      await CarbonData.bulkCreate(mockData);
      console.log('Database seeded successfully');
    }
  } catch (error) {
    console.error('Database initialization error:', error);
    console.log('Using fallback in-memory data storage');
  }
}

// Initialize database before starting the server
initializeDatabase();

app.get('/test', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', carbonIntensityRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    error: err.message,
  });
});

export default app;
