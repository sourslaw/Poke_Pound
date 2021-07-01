const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pokemon extends Model {}

Pokemon.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    Pokemon: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Type1: {
        type: DataTypes.STRING,
    },
    Type2: {
        type: DataTypes.STRING,
    },
    Price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Attack: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Defense: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Speed: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Special: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    GIF: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    PNG: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
    },
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'pokemon',
});

module.exports = Pokemon;