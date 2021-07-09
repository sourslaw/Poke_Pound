const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pokemon extends Model {}

Pokemon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      // autoIncrement: true,
    },
    pokemon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type1: {
      type: DataTypes.STRING,
    },
    type2: {
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
    seed: {
      type: DataTypes.INTEGER,
    },
    special: {
      type: DataTypes.INTEGER,
    },
    gif: {
      type: DataTypes.STRING,
    },
    png: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
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
    modelName: 'pokemon',
  }
);

module.exports = Pokemon;
