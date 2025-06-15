import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.createTable('CarbonData', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            from: {
                type: DataTypes.STRING
            },
            to: {
                type: DataTypes.STRING
            },
            intensity_forecast: {
                type: DataTypes.INTEGER
            },
            intensity_actual: {
                type: DataTypes.INTEGER
            },
            index: {
                type: DataTypes.STRING
            },
            gas: {
                type: DataTypes.FLOAT
            },
            coal: {
                type: DataTypes.FLOAT
            },
            biomass: {
                type: DataTypes.FLOAT
            },
            nuclear: {
                type: DataTypes.FLOAT
            },
            hydro: {
                type: DataTypes.FLOAT
            },
            imports: {
                type: DataTypes.FLOAT
            },
            wind: {
                type: DataTypes.FLOAT
            },
            solar: {
                type: DataTypes.FLOAT
            },
            other: {
                type: DataTypes.FLOAT
            },
            misc: {
                type: DataTypes.FLOAT
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: new Date()
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: new Date()
            }
        });
    },
    down: async (queryInterface: QueryInterface) => {
        await queryInterface.dropTable('CarbonData');
    }
};