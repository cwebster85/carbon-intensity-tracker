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
    public misc?: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
    CarbonData.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        from: DataTypes.STRING,
        to: DataTypes.STRING,
        intensity_forecast: DataTypes.INTEGER,
        intensity_actual: DataTypes.INTEGER,
        index: DataTypes.STRING,
        gas: DataTypes.FLOAT,
        coal: DataTypes.FLOAT,
        biomass: DataTypes.FLOAT,
        nuclear: DataTypes.FLOAT,
        hydro: DataTypes.FLOAT,
        imports: DataTypes.FLOAT,
        wind: DataTypes.FLOAT,
        solar: DataTypes.FLOAT,
        other: DataTypes.FLOAT,
        misc: DataTypes.FLOAT
    }, {
        sequelize,
        tableName: 'CarbonData',
        modelName: 'CarbonData'
    });

    return CarbonData;
};