import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'carbon_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    logging: false,
  },
);

export const CarbonData = sequelize.define(
  'CarbonData',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    intensity_forecast: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    intensity_actual: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    index: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gas: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    coal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    biomass: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    nuclear: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    hydro: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    imports: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    wind: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    solar: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    other: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: 'carbon_data',
    timestamps: true,
  },
);

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
};
