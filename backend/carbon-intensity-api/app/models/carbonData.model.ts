import { Model, DataTypes, Sequelize } from 'sequelize';

export class CarbonData extends Model {
  public id!: number;
  public from!: string;
  public to!: string;
  public intensity_forecast!: number;
  public intensity_actual!: number;
  public index!: string;
  public gas!: number;
  public coal!: number;
  public biomass!: number;
  public nuclear!: number;
  public hydro!: number;
  public imports!: number;
  public wind!: number;
  public solar!: number;
  public other!: number;
}

export function initCarbonDataModel(sequelize: Sequelize) {
  CarbonData.init(
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
      sequelize,
      modelName: 'CarbonData',
      tableName: 'carbon_data',
      timestamps: true,
    },
  );

  return CarbonData;
}
