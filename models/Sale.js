const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Sale extends Model {}

Sale.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    attack: {
        type: DataTypes.INTEGER,
    },
    defense: {
        type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.TEXT,
    },
    sold: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    pokemon_id: {
        type: DataTypes.INTEGER,
        references: {
        model: 'pokemon',
        key: 'id',
        },
    },
    seller_id: {
        type: DataTypes.INTEGER,
        references: {
        model: 'seller',
        key: 'id',
        },
    },
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'sale',
    }
);

module.exports = Sale;
